import { React, useContext } from 'react';
import { useMongoContent, useUserData, useRecommendation} from "../hooks";
import selectionFilter from "../utils/selection-filter";
import { BrowseContainer } from "../containers/browse";
import { FirebaseContext } from '../context/firebase';


export default function Browse() {
    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};


    const { watchlist } = useUserData('watchlist', user.email);
    const { series } = useMongoContent('series');
    const { films } = useMongoContent('films');
    const { recommendation } = useRecommendation(user.email);
    
    series.forEach(item => {
        item.watchlist = watchlist.includes(item.slug);
        item.recommendation = recommendation.includes(item.title)
        item.category = 'series';
    });
    
    films.forEach(item => {
        item.watchlist = watchlist.includes(item.slug);
        item.recommendation = recommendation.includes(item.title)
        item.category = 'films';
    });
    
    const watchLists = watchlist.map(slug => {
        const detailsFromSeries = series.find(item => item.slug === slug);
        const detailsFromFilms = films.find(item => item.slug === slug);
        return detailsFromSeries || detailsFromFilms;
    }).filter(item => item !== undefined); // Remove undefined entries

    const recommendationLists = recommendation.map(title => {
        const detailsFromSeries = series.find(item => item.title === title);
        const detailsFromFilms = films.find(item => item.title === title);
        return detailsFromSeries || detailsFromFilms;
    }).filter(item => item !== undefined); // Remove undefined entries
    const slides = selectionFilter({ series, films, watchLists, recommendationLists });
    console.log(slides)
    return <BrowseContainer slides={slides} />;
}
