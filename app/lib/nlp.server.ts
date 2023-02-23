import NLPCloudClient from 'nlpcloud';

const client = new NLPCloudClient('bart-large-cnn', '7fe4a23c8bf19b2838902ec7d6a6aefb15dc57e6', false, 'ru');

export const summary = client
    .summarization(
        `Sur des images aériennes, prises la veille par un vol de surveillance 
  de la Nouvelle-Zélande, la côte d’une île est bordée d’arbres passés du vert 
  au gris sous l’effet des retombées volcaniques. On y voit aussi des immeubles
  endommagés côtoyer des bâtiments intacts. « D’après le peu d’informations
  dont nous disposons`
    )
    .then(function (response) {
        console.log({ response });
    })
    .catch(function (err) {
        console.error(err.response.data);
        // console.error(err.response.data.detail);
    });
