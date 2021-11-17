import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, Dimensions, FlatList, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from 'react-native-snap-carousel';
import GradientBackground from '../components/GradientBackground';
import HorizontalSlider from '../components/HorizontalSlider';
import ImageColors from 'react-native-image-colors'

import MoviePoster from '../components/MoviePoster';
import useMovies from '../hooks/useMovies';
import { getImageColors } from '../helpers/getColores';
import { GradientContext } from '../context/GradientContext';

const  {width: windowWith, height: windowHeight}= Dimensions.get('window')

const HomeScreen = () => {

    const {nowPlaying, popular,  topRated, upcoming, isLoading} = useMovies();
    const {top} = useSafeAreaInsets();
    const { setMainColors } = useContext(GradientContext)



    const getPosterColor = async(index : number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const [primary='green', secondary='orange'] = await getImageColors(uri);
        
        setMainColors({primary, secondary})
    }

    useEffect(() => {
        if(nowPlaying.length > 0) {
            getPosterColor(0);
        }
    }, [nowPlaying])

    if(isLoading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignContent: 'center'}}>
                <ActivityIndicator color="red" size={30}/>
            </View>
        )
    }
    return (
        <GradientBackground>
            <ScrollView>
                <View style={{marginTop: top + 20}}>
                    <View style={{height: 440}}>
                        <Carousel 
                            data={nowPlaying}
                            renderItem={({item} : any) =><MoviePoster movie={item}/> }
                            sliderWidth={windowWith}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={index => getPosterColor(index)}
                        />
                    </View>
                    <HorizontalSlider title="Popular" movies={popular} />
                    <HorizontalSlider title="Top Rated" movies={topRated} />
                    <HorizontalSlider title="Upcoming" movies={upcoming} />
                </View>
            </ScrollView>
        </GradientBackground>
    )
}

export default HomeScreen
