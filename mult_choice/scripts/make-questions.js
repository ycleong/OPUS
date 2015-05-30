/*
This is just a sample to see what each object in the 'movie' structure should look like. The actual version of this variable will be generated using a JSON file (work in progress). :)
CONVENTIONS FOR CONDITIONS: [valence setting genre]
Examples:
[-1 -1 -1]  = negative sci-fi action
[ 1  1  1]  = positive historical romance
*/

var movies = [
    // 1
    {cond: [1, 1, 1],
     name: 'The Apple of My Eye',
     poster: 'appleofmyeye.jpg',
     plot: 'In late 1800s New York, a young Jewish immigrant girl meets the dashing son of an oil tycoon.               Against the whirlwind backdrop of a fast growing city, their connection blossoms into something             more as they overcome the prejudices of their time and succeed in convincing their friends and             family to support their union.',
     question: 'What do the main characters need obtain in order to be together?', 
     options: ['Support from their friends and family',
               'Enough money in order to hold their wedding',
               'A priest who is willing to ordain their ceremony',
               'Their grandparents’ wedding rings']},
];