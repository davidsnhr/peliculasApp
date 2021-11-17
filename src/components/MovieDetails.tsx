import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import currencyFormatter from 'currency-formatter';

import { Cast } from '../interfaces/creditInterface'
import { MovieFull } from '../interfaces/movieInterface'
import CastItem from './CastItem';
import { FlatList } from 'react-native-gesture-handler';

interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}

const MovieDetails = ({movieFull, cast}:Props) => {
    return (
        <>
            <View style={{marginHorizontal:20}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon 
                        name="star-outline"
                        color="grey"
                        size={16}
                    />
                    <Text>{movieFull.vote_average}</Text>

                    <Text style={{marginLeft: 5}}>
                        -{movieFull.genres.map(genre=> genre.name).join('.')}
                    </Text>
                </View>
                <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
                    Historia
                </Text>
                <Text style={{fontSize:16}}>{movieFull.overview}</Text>
                <Text style={{fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
                    Presupuesto
                </Text>
                <Text>{ currencyFormatter.format(movieFull.budget, {code : 'USD'})}</Text>
            </View>

            <View style={{marginTop:10, marginBottom:100}}>
                <Text style={{fontSize: 23, marginTop: 10, fontWeight:'bold', marginHorizontal:20}}> Actores </Text>
                <FlatList 
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <CastItem actor={item}/> }
                    horizontal= { true }
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: 10, height:70}}
                />
            </View>

      
        </>
    )
}

export default MovieDetails
