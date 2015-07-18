///// ——————————————————— HELPER FUNCTIONS  ——————————————————— /////
// random(a,b); Returns random number between a and b, inclusive
function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}

// Shuffles Array
function shuffle() {
    var length0 = 0,
        length = arguments.length,
        i,
        j,
        rnd,
        tmp;

    for (i = 0; i < length; i += 1) {
        if ({}.toString.call(arguments[i]) !== "[object Array]") {
            throw new TypeError("Argument is not an array.");
        }

        if (i === 0) {
            length0 = arguments[0].length;
        }

        if (length0 !== arguments[i].length) {
            throw new RangeError("Array lengths do not match.");
        }
    }


    for (i = 0; i < length0; i += 1) {
        rnd = Math.floor(Math.random() * i);
        for (j = 0; j < length; j += 1) {
            tmp = arguments[j][i];
            arguments[j][i] = arguments[j][rnd];
            arguments[j][rnd] = tmp;
        }
    }
}

///// ——————————————————— MOVIES  ——————————————————— /////
var movies = [{"cond": "[1, 1, 1]", "tag": "positive, historical, romance",
      "poster": "appleofmyeye.jpg",
      "title": "The Apple of my Eye",
      "plot": "In late 1800s New York, a young Jewish immigrant girl meets the dashing son of an oil tycoon. Against the whirlwind backdrop of a fast growing city, their connection blossoms into something more as they overcome the prejudices of their time and succeed in convincing their friends and family to support their union.",
      "question": "What do the main characters need to obtain in order to be together?",
      "correct": "Support from their friends and family",
      "alt1": "Enough money in order to hold their wedding",
      "alt2": "A priest who is willing to ordain their ceremony",
      "alt3": "Their grandparents\u2019 wedding rings"}, 
     {"cond": "[1, 1, 1]", "tag": "positive, historical, romance",
      "poster": "loveontherailroad.png",
      "title": "Love on the Railroad",
      "plot": "Timothy White dreams of railroads. It is 1789, and he is one of the men chosen to design the newest steam engine train. While under the tutelage of Jim Thomas, he meets Thomas' daughter, Laura, an intelligent and introspective woman who causes him to take an interest in something beyond machinery for the first time.",
      "question": "What compels Timothy White to dream of something beyond trains?",
      "correct": "His mentor\u2019s daughter",
      "alt1": "The promise of bucketloads of money",
      "alt2": "The invention of buses",
      "alt3": "A stray dog that he decides to take in"},
     {"cond": "[1, 1, 1]", "tag": "positive, historical, romance",
      "poster": "courtshipedithjames.png",
      "title": "The Courtship of Edith & James",
      "plot": "The year is 1783, and Edith Warren has finally come of age. After attending her first ball, she catches the attention of the wealthy lawyer, James Benedict. She is stunned by his kindness, while he is enamored with her intellect. Their mutual attraction culminates in a passionate courtship and, ultimately, wedded bliss.",
      "question": "What happens when Edith attends her first ball?",
      "correct": "She catches the attention of a wealthy lawyer",
      "alt1": "She learns to waltz",
      "alt2": "Her siblings recite a speech in her honor",
      "alt3": "She discovers that she really enjoys soup"},
     {"cond": "[1, 1, 1]", "tag": "positive, historical, romance",
      "poster": "ellisisland.png",
      "title": "Ellis Island",
      "plot": "When Connor and Abigail immigrated to the United States in 1892, they had merely a few dollars and a fair amount of hope between the two of them. After passing through Ellis Island to get to New York, Connor and Abigail experience all the prosperity that the American Dream promised.",
      "question": "What did Connor and Abigail bring with them on the journey through Ellis Island?",
      "correct": "A few dollars and a lot of hope",
      "alt1": "Journals detailing their story",
      "alt2": "Old photo albums of their family",
      "alt3": "Their pet dog, Sparky"},
     {"cond": "[1, 1, -1]", "tag": "positive, historical, action",
      "poster": "railroadstation.png",
      "title": "A Railroad Station",
      "plot": "Martin White, a poor black railroad worker living in 1823, receives the shock of his life when, after thirty years of service, the railroad company owner bequeaths the entirety of his company to him on his deathbed. After jumping from rags to riches overnight, Martin's first job is to chase down and outwit a couple of cunning thieves who've just stolen his latest shipment!",
      "question": "What is the first obstacle Martin runs into after gaining ownership of the railroad company?",
      "correct": "A group of thieves have stolen his latest shipment",
      "alt1": "The previous owner borrowed a lot of money from gangsters who have come to collect",
      "alt2": "Animals have built nests on the railroads, and must be cleared out",
      "alt3": "The workers refuse to listen to his commands"},
     {"cond": "[1, 1, -1]", "tag": "positive, historical, action",
      "poster": "returninghome.png",
      "title": "Returning Home",
      "plot": "It is the year 1521, and Ferdinand Magellan has died just one month before seeing his trip around the world completed. His second-in-command, Juan Sebastian Elcano, picks up Magellan's mantle. Determined to finish what he started, Elcano teams up with the remaining crew to become the first people to ever circle the world and finally return home.",
      "question": "Who takes on the task of successfully circumnavigating the globe after Magellan’s untimely death?",
      "correct": "His second-in-command, Juan Sebastian Elcano",
      "alt1": "His fierce competitor, who has been just hours behind",
      "alt2": "His eldest son",
      "alt3": "Christopher Columbus"},
     {"cond": "[1, 1, -1]", "tag": "positive, historical, action",
      "poster": "findingmonalisa.jpg",
      "title": "Finding Mona Lisa",
      "plot": "It is early nineteenth century, and the Mona Lisa has been stolen from the Louvre. In order to prevent word of the painting's theft from reaching the masses, two brilliant private investigators, Clement Moreau and Olivier Durand, have been commissioned to find it. Eager to close the case of a lifetime, they embark on an adventure across Europe to recover this precious work of art.",
      "question": "Why are private investigators hired to find the Mona Lisa?",
      "correct": "In order to keep news of the painting\u2019s theft from reaching the masses",
      "alt1": "Because the police force has been infiltrated and can no longer be trusted",
      "alt2": "Because the police are completely stumped and have run out of leads",
      "alt3": "One of the private investigators has studied the Mona Lisa extensively and can easily spot a fake"},
     {"cond": "[1, 1, -1]", "tag": "positive, historical, action",
      "poster": "goldseeker.png",
      "title": "The Gold Seeker",
      "plot": "In the late 1800s, James Caldwell leaves his comfortable life in the English countryside and heads East, seeking adventure and lands unknown. During his journey, he rises from nameless stowaway to wealthy trader through his bravery, cunning, and tenacity. When James hears whispers about a trove of gold hidden in the desert, he gathers a crew of ragtag adventurers and embarks on the quest of his life.",
      "question": "What caused James Caldwell to leave his comfortable life in the countryside?",
      "correct": "He desires adventure and discovery of foreign lands",
      "alt1": "He discovers that he has a long lost sister and seeks to find her",
      "alt2": "His parents lost their fortune in a series of bad trades, forcing him to leave England",
      "alt3": "He heard stories of beautiful works of art and sought to experience them for himself"},
     {"cond": "[1, -1, 1]", "tag": "positive, futuristic, romance",
      "poster": "planetoftheindigo.png",
      "title": "Planet of the Indigo",
      "plot": "Sue has spent much of her adult life on a spaceship, traveling in earnest towards habitable land. After years of searching, the ship chances upon a populated planet. There, she meets the inhabitants:  people that look much like humans, except with blue-tinged skin. When Sue meets Ann, a native of this planet, they overcome societal prejudice in order to consummate their love.",
      "question": "What is Sue\u2019s relationship to Ann?",
      "correct": "Lovers attempting to overcome societal prejudice",
      "alt1": "Co-leaders of a political revolution",
      "alt2": "Crewmates on the spaceship",
      "alt3": "Members of warring civilizations"},
     {"cond": "[1, -1, 1]", "tag": "positive, futuristic, romance",
      "poster": "cyberneticromance.jpg",
      "title": "Cybernetic Romance",
      "plot": "Ben is an android postman who delivers packages at the speed of light. While on a routine delivery, he stumbles across Christine, a human girl, getting mugged. After saving Christine, Ben strikes up a fledgling relationship with her as they navigate the joys and oddities of an android-human romance!",
      "question": "How does Ben meet Christine?",
      "correct": "He saves her from a mugging",
      "alt1": "They work at the same postal service company",
      "alt2": "She moves in next door as his new neighbor",
      "alt3": "He delivers a package to her"},
     {"cond": "[1, -1, 1]", "tag": "positive, futuristic, romance",
      "poster": "23rdcenturyromance.png",
      "title": "My 23rd Century Romance",
      "plot": "Camille is a historian that has travelled hundreds of years into the future, settling down in 23rd century New York City. Her initial plans to maintain the role of an objective observer are derailed when she meets Andrew, a kind and lonely man whose heart of gold compels her to stay.",
      "question": "Why is Camille unable to stay objective in her observations of 23rd century life?",
      "correct": "She falls in love with a man that encourages her to stay in the future",
      "alt1": "She discovers that there is rampant injustice within the city",
      "alt2": "She meets her great-great-great-great grandchildren and is overcome by curiosity",
      "alt3": "She realizes that there are so many amazing things to do in future New York"},
     {"cond": "[1, -1, 1]", "tag": "positive, futuristic, romance",
      "poster": "builttolast.png",
      "title": "Built to Last",
      "plot": "Carrie has built the perfect servant:  Jim - a robot who cleans, cooks and keeps her company. Over time, Jim develops a mind of his own,  falling in love with the bubbly and sometimes clumsy Carrie. Unbeknownst to him, Carrie has developed feelings for him too. In this quirky tale of bumbling romance, the two lovers discover a relationship that was built to last.",
      "question": "What happens after Jim develops a mind of his own?",
      "correct": "He falls in love with his creator",
      "alt1": "He realizes that he wants to be more than just a housekeeper",
      "alt2": "He begins venturing out into the real world to learn about humans",
      "alt3": "He decides to build a robot companion of his own"},
     {"cond": "[1, -1, -1]", "tag": "positive, futuristic, action",
      "poster": "scientist.jpg",
      "title": "The Scientist",
      "plot": "After years of research, Marija Petkovic has developed a super-serum that gives users incredible mental and physical abilities. Armed with this powerful drug, Marija sets out to dismantle a secret society bent on controlling the city's people. As news of her super alter-ego, The Scientist, spread, Marija grows into a beacon of justice and hope for the people of Metropolis.",
      "question": "What does Marija do after gaining superpowers?",
      "correct": "Dismantle a secret society that has a nefarious agenda",
      "alt1": "Rebuild homes that have been destroyed by hurricane",
      "alt2": "Travel back in time and kill Hitler",
      "alt3": "Use them for world domination"},
     {"cond": "[1, -1, -1]", "tag": "positive, futuristic, action",
      "poster": "playingthegame.jpg",
      "title": "Playing the Game",
      "plot": "When the newest video game, Caves and Lizards, is released, people all over excitedly plug in for a chance to play this virtual reality game, which allows players to experience the game's world with all their senses. When the virtual world becomes overrun with mysterious viruses, it is up to teenage computer genius Eva Markman and her trusty virtual pet, Widget, to save the day!",
      "question": "What is wrong with the virtual world of Caves and Lizards?",
      "correct": "It has become overrun with mysterious viruses",
      "alt1": "It is really a covert military training program for preteens",
      "alt2": "Players are getting trapped in the game",
      "alt3": "It\u2019s secretly stealing from players\u2019 bank accounts"},
     {"cond": "[1, -1, -1]", "tag": "positive, futuristic, action",
      "poster": "spacewarriors.jpg",
      "title": "Space Warriors",
      "plot": "The summer after high school, Rae and Daniel, two teenagers living on planet Earth-49, discover a wormhole in the art room of the old school building. Rae and Daniel begin jumping through space and time, fighting off extraterrestrial bad guys while exploring the stars and, ultimately, saving the galaxy!",
      "question": "What does the wormhole allow Rae and Daniel to do?",
      "correct": "Jump through space and time",
      "alt1": "Create enough heat of convection to bake cookies",
      "alt2": "Read the minds of nearby woodland animals",
      "alt3": "Turn invisible for a few minutes"},
     {"cond": "[1, -1, -1]", "tag": "positive, futuristic, action",
      "poster": "worlddome.png",
      "title": "The World Dome",
      "plot": "Sam Boon lives on Mars with his wife and three children. Sam and his family embark on a journey to the Supply Dome in search of more food and materials. Along the way, they brave massive windstorms and nefarious terrain, and find themselves meeting all manner of eclectic characters in this fun and adventurous tale.",
      "question": "Where are Sam and his family headed?",
      "correct": "To the Supply Dome",
      "alt1": "Back to their home in Dome 25",
      "alt2": "To their grandparents\u2019 dome",
      "alt3": "To a new dome after their first one is destroyed"},
     {"cond": "[-1, 1, 1]", "tag": "negative, historical, romance",
      "poster": "loveoftheking.png",
      "title": "The Love of the King",
      "plot": "John IV is the heir apparent to Poland-Lithuania and, after the death of his father, his ascension is all but assured. However, after meeting the general of his army, William, John finds himself in a passionate affair with him. When their illicit relationship is discovered by a handmaiden, John must choose mutual death, or the rejection of the only love he's ever known.",
      "question": "What is the main source of conflict that heir apparent John IV grapples with during the course of this film?",
      "correct": "John has fallen in love with another man",
      "alt1": "John\u2019s father does not believe he is fit to be king",
      "alt2": "The kingdom is experiencing major economic decline",
      "alt3": "John\u2019s brother seeks to usurp the throne"},
              {"cond": "[-1, 1, 1]", "tag": "negative, historical, romance","poster": "poisonousaffairs.png","title": "Poisonous Affairs","plot": "In order to pay off an insurmountable debt, Celeste's family arranges for her to marry the wealthy aristocrat Charles de Couvilliers during pre-revolutionary France. What begins as a peaceful marriage turns sour when Celeste grows more obsessed and possessive. When she discovers that Charles has lovers scattered across Paris, she begins poisoning his lovers, one by one.","question": "How does C\u00e9leste respond to the discovery of her husband\u2019s infidelity?","correct": "She begins poisoning the mistresses, one by one","alt1": "She leaves him and moves back in with her family","alt2": "She confronts him, and they bicker incessantly","alt3": "She ignores it, in the hopes that he will change"},{"cond": "[-1, 1, 1]", "tag": "negative, historical, romance","poster": "ladyinred.jpg","title": "The Lady in Red","plot": "In the height of the Romantic Era in Paris, a rising poet struggles to find inspiration when he meets an enticing young woman. As he grows more and more obsessed, he discovers a dangerous secret:  she is the concubine of the most wealthy man in the city. Trouble abounds when the wealthy man comes looking for retribution.","question": "What is the source of the poet\u2019s troubles?","correct": "He has incited the wrath of the city\u2019s wealthiest man","alt1": "None of his works have been accepted by a publisher","alt2": "His parents have disowned him for his failures","alt3": "His lover has passed away, and he is incapable of moving on"},{"cond": "[-1, 1, 1]", "tag": "negative, historical, romance","poster": "inchains.png","title": "In Chains","plot": "While traveling to town for supplies, Timothy, a freed slave, is caught and sold back into slavery. Enduring the harsh difficulties of his servitude, he meets and falls in love with a fellow slave, Betsy. Enamored with Betsy, Timothy forgoes his pursuit of freedom in order to stay with her, even at the risk of lifelong servitude under a merciless owner.","question": "What causes Timothy to give up pursuing freedom from slavery?","correct": "He falls in love with a fellow slave","alt1": "He realizes that escape is futile, as he\u2019ll only be caught again","alt2": "His owner removes one of his legs","alt3": "He feels a sense of blind loyalty to his owner"},
              {"cond": "[-1, 1, -1]", "tag": "negative, historical, action", 
 "poster": "beforethetrail.png",
 "title": "Before the Trail",
 "plot": "After the Indian Removal Act is signed by President Andrew Jackson, Holata, a man living with his family in the Seminole tribe, is forced to fight against European settlers invading their homeland. As friends, neighbors, and fellow tribesmen are forcibly carted away, Holata is faced with a difficult choice:  die fighting, or assimilate and give up his soul.",
 "question": "Which tribe is Holata a part of?",
 "correct": "Seminole",
 "alt1": "He\u2019s a European settler",
 "alt2": "Cherokee",
 "alt3": "Hopi"},
 {"cond": "[-1, 1, -1]", "tag": "negative, historical, action", 
  "poster": "challenger.png",
  "title": "The Challenger",
  "plot": "Markus is a condemned man with one option left for freedom:  a public duel against Helmut, the man who has accused him. Largely inexperienced in fighting, he squares off against a veteran fencer in a hopeless, desperate battle for liberation in the face of death.",
  "question": "How does Markus intend to earn his freedom?",
  "correct": "Participating in a duel against his accuser",
  "alt1": "Working as an indentured servant",
  "alt2": "Going to prison",
  "alt3": "Seeking out the assistance of an old friend"},
 {"cond": "[-1, 1, -1]", "tag": "negative, historical, action", 
  "poster": "nitotswords.png",
  "title": "Nitot's Swords",
  "plot": "When the whisperings of battle begin to clutter the air, Nitot, a French swordsmith, is commissioned to forge several swords for the Revolution. After each sword bearer meets his end due to inexplicable bouts of rampant, violent madness, the populace grows wary of his seemingly \"cursed\" works, an idea that begins to plague Nitot himself.",
  "question": "What happens to each person who wields one of Nitot\u2019s weapons?",
  "correct": "They succumb to violent madness",
  "alt1": "People attempt to steal the swords from them",
  "alt2": "They are enlisted into the army",
  "alt3": "The swords act as a status symbol, and the public holds them in high esteem"},
 {"cond": "[-1, 1, -1]", "tag": "negative, historical, action", 
  "poster": "outforblood.png",
  "title": "Out for Blood",
  "plot": "After searching as far as Dublin and London in vain for some cure for the potato blight that had ravaged his family's crops, Irishman Aiden Grady returns to his farm in the Irish countryside to find that his wife and children had been murdered. Overcome with grief and rage, Aiden seeks revenge on the radical British anti-secessionist responsible.",
  "question": "What is the protagonist seeking revenge for?",
  "correct": "The murder of his wife and children",
  "alt1": "The razing of his crops",
  "alt2": "The loss of his job to a younger worker",
  "alt3": "Having been conned out of his life savings"},
 {"cond": "[-1, -1, 1]", "tag": "negative, futuristic, romance", 
  "poster": "flood.png",
  "title": "The Flood",
  "plot": "Fifty years from now, Earth's sea level has risen by several feet, swallowing whole cities in its wake. Andrea de Silva stays with his wife after the last escape pods have shuttled people out of a rapidly flooding Manhattan and into a new moon colony. As the tide rises and death looms over them, Andrea and his wife reminisce about their meeting, and the events leading up to their love.",
  "question": "How did Manhattan become flooded?",
  "correct": "Climate change melted the ice caps and caused the sea level to rise",
  "alt1": "Nuclear warfare",
  "alt2": "Extraterrestrial beings converted all of the carbon dioxide within the air into water",
  "alt3": "Terrorists destroyed reservoirs throughout New York City"},
 {"cond": "[-1, -1, 1]", "tag": "negative, futuristic, romance", 
  "poster": "outdated.jpg",
  "title": "Outdated",
  "plot": "A-347 and CX-298 are deeply in love. CX is a human woman and A is a deceased man whose consciousness has been re-uploaded into a mechanical body. As A-347's software begins to show its age, the couple must contend with A's diminishing ability to develop and retain memory.",
  "question": "What obstacle must the lovers contend with?",
  "correct": "A-347\u2019s software is degrading",
  "alt1": "They are on the run from people who wish to reduce them into metal scraps",
  "alt2": "CX-298 has fallen out of love with A-347",
  "alt3": "CX-298 finds A-347\u2019s mechanical body physically unappealing"},
 {"cond": "[-1, -1, 1]", "tag": "negative, futuristic, romance", 
  "poster": "quarantined.jpg",
  "title": "Quarantined",
  "plot": "When a boat containing deadly virus samples capsizes off of northern Canada's coast, a powerful man-made virus spreads throughout the continent, rendering 70 percent of the population catatonic. Sebastian attempts to maintain some sense of normalcy with the love of his life, Anna, while ignoring growing evidence of her illness. As they attempt to hold on to their regular lives, Sebastian is forced to watch the slow deterioration of his fiancee.",
  "question": "What is standing in the way of Sebastian and Ana\u2019s normal lives?",
  "correct": "Ana is showing symptoms of an incurable disease",
  "alt1": "Their dogs have become incredibly aggressive and animal control seeks to take them away",
  "alt2": "Prisoners have overtaken society and seek to impose a new world order",
  "alt3": "Massive global pollution has confined them to the only city left with clean air"},
 {"cond": "[-1, -1, 1]", "tag": "negative, futuristic, romance", 
  "poster": "labrats.png",
  "title": "Lab Rats",
  "plot": "Kendra and Sam are synthetic humans, created and grown entirely within Global Safety Labs. From birth, they have been used as human research subjects in medical drug testing. Kendra and Sam grapple with their growing love and slowly developing free will while attempting to keep their relationship hidden from the researchers, who intend to terminate any subject that grows beyond their purpose.",
  "question": "What are Kendra and Sam afraid of the researchers discovering?",
  "correct": "Their growing love for each other",
  "alt1": "Their knowledge of what the experiments are really for",
  "alt2": "That one of them is dying",
  "alt3": "That Sam\u2019s heart cells hold the key to curing cancer"},
 {"cond": "[-1, -1, -1]", "tag": "negative, futuristic, action",
  "poster": "loneranger.png",
  "title": "The Lone Ranger",
  "plot": "After the devastating explosion of a nuclear power plant in Canada, the radiation emitted from the event has mutated all of the surrounding animal life into monstrously aggressive creatures. Timothy Rogers, a park ranger, stands alone in his quest to protect the the group of human survivors camping in his park.",
  "question": "What is Timothy Rogers attempting to protect?",
  "correct": "A group of human survivors camping",
  "alt1": "The animals within the park",
  "alt2": "His family",
  "alt3": "His ancestral home"},
 {"cond": "[-1, -1, -1]", "tag": "negative, futuristic, action",
  "poster": "humantrafficking.jpg",
  "title": "Human Trafficking",
  "plot": "In 2439, people have learned to grow humans in-vitro, rendering the need for natural births obsolete. Bolly is one of the few young women still fertile after sterilization of children became a law. Reeling from the loss of her stillborn son, she ends up on the run from black market traders seeking to commodify her fertility.",
  "question": "Why is Bolly on the run from black market traders?",
  "correct": "She is one of the few young women still fertile",
  "alt1": "They intend to sell her organs",
  "alt2": "She is the long lost daughter of the leader of their organization",
  "alt3": "She has stolen a priceless artifact from their warehouse"},
 {"cond": "[-1, -1, -1]", "tag": "negative, futuristic, action",
  "poster": "wheretheyvegone.png",
  "title": "Where They've Gone",
  "plot": "At long last, scientists have developed a machine that can instantly transport a person to any location on Earth. However, when people start disappearing mid-transport, Katherine Patterson is tasked with finding them. In her search for the missing persons, she discovers a far more insidious operation, involving mass corruption and government affiliated human trafficking.",
  "question": "How are people going missing?",
  "correct": "They are disappearing from teleportation machines",
  "alt1": "Mysterious men are picking people up in dark alleys",
  "alt2": "They are being lured in by well-paying psychology studies",
  "alt3": "They are vanishing from their bedrooms"},
 {"cond": "[-1, -1, -1]", "tag": "negative, futuristic, action",
  "poster": "400years.png",
  "title": "400 Years",
  "plot": "After Lisa is severely injured in a horrifying bus crash, she wakes up discovering that someone had collected her dismembered remains from the wreckage and put her back together. She learns that 400 years have passed since the accident. Armed with her new robotic body, Lisa hunts down members of a suspicious organization to find out who brought her back to life, and why.",
  "question": "What is Lisa hunting the members of the organization for?",
  "correct": "Answers to why she was resurrected",
  "alt1": "A chance to ascend their ranks",
  "alt2": "Revenge for the death of her family",
  "alt3": "Vast stores of information that she can use to take down the government"}]

// Preloading images
var images = new Array;

function preload(imgfiles) {
    for (i = 0; i < imgfiles.length; i++) {
        images[i] = new Image();
        images[i].src = "images/" + imgfiles[i];}}

preload([].concat.apply([],movies.map(function(a) {return a.poster;})))

///// ——————————————————— BASIC VARIABLES  ——————————————————— /////
// All conditions
// TODO: Change Matlab conventions, generated responses to match Javascript conventions
var conds = ["[1, 1, 1]", "[1, 1, -1]", "[1, -1, 1]", "[1, -1, -1]", "[-1, 1, 1]", "[-1, 1, -1]", 
             "[-1, -1, 1]", "[-1, -1, -1]"];

// All possible combinations of conditions (counterbalanced by side)
var all_comb       =   [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
                        [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7],
                        [2, 3], [2, 4], [2, 5], [2, 6], [2, 7],
                        [3, 4], [3, 5], [3, 6], [3, 7],
                        [4, 5], [4, 6], [4, 7],
                        [5, 6], [5, 7],
                        [6, 7],
                        [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0],
                        [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
                        [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
                        [4, 3], [5, 3], [6, 3], [7, 3],
                        [5, 4], [6, 4], [7, 4],
                        [6, 5], [7, 5],
                        [7, 6]];

// Dummy target information
var target_preferences =[[1, .5, 0], [0, 1, -.5], [-.5, 0, 1], [-1, -.5, 0]]; // Preference weights

var ties = [[0, 13, 22, 27, 28, 41, 50, 55], // Trials to cut
            [3, 10, 16, 21, 31, 38, 44, 49],
            [1, 8, 23, 26, 29, 36, 51, 54],
            [0, 13, 22, 27, 28, 41, 50, 55]];

// Target responses (same ordering as all_comb)
var target_responses =[
    // Target 1
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5,
     0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5],

    // Target 2
    [1, 0, 0, 5, 0, 0, 1, 1, 1, 1, 1, 3, 4, 5, 7, 4, 5, 3, 5, 4, 4, 5, 5, 7,
     1, 0, 0, 5, 0, 0, 1, 1, 1, 1, 1, 3, 4, 5, 7, 4, 5, 3, 5, 4, 4, 5, 5, 7],

    // Target 3
    [0, 0, 4, 0, 6, 0, 2, 4, 5, 6, 7, 2, 4, 2, 6, 2, 4, 5, 6, 7, 4, 4, 6, 6,
     0, 0, 4, 0, 6, 0, 2, 4, 5, 6, 7, 2, 4, 2, 6, 2, 4, 5, 6, 7, 4, 4, 6, 6],

    // Target 4
    [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7, 4, 5, 6, 7, 6, 7, 6, 7,
     2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7, 4, 5, 6, 7, 6, 7, 6, 7]];

///// ——————————————————— SPLIT MOVIES INTO PHASES  ——————————————————— /////    
var movies_by_phase = [[], []];

for (i = 0; i < conds.length; ++i) {
    var temp_match = $.grep(movies, function(e){ return e.cond == conds[i]; });
    shuffle(temp_match);
    
    movies_by_phase[0] = movies_by_phase[0].concat(temp_match.splice(0,2));
    movies_by_phase[1] = movies_by_phase[1].concat(temp_match);
}

// Shuffle movies_by_phase
shuffle(movies_by_phase[0]);
shuffle(movies_by_phase[1]);
    
conditions_by_phase = [all_comb.slice(0).map(function(e){return e.slice(0)}), all_comb.slice(0).map(function(e){return e.slice(0)})];

available_movies = [[],[]];
for (phase = 0; phase < available_movies.length; phase++) {
    for (c = 0; c < conds.length; c++) {
        tmp_array = $.grep(movies_by_phase[phase], function(e){ return e.cond == conds[c];});
        while (tmp_array.length < 14) {tmp_array = tmp_array.concat(tmp_array.slice(0,2));}
        posters = tmp_array.map(function(e){return e.poster});
        shuffle(posters)
        available_movies[phase].push(posters);
    }
}

choices_by_phase = [[], []];
for (phase = 0; phase < available_movies.length; phase++) {
    for (trial = 0; trial < conditions_by_phase[phase].length; trial++) {
        c = conditions_by_phase[phase][trial];
        choices_by_phase[phase].push([available_movies[phase][c[0]].shift(), available_movies[phase][c[1]].shift()]);
    }
}


///// ——————————————————— GENERATE RESPONSES  ——————————————————— /////

// Returns parameters to be fed to experiment: (0) condition order, (1) options per trial, (2) target answers
function get_ans(target){
    conditions = [[], []];
    options = [[], []];
    ans = [[], []];
        
    for (phase = 0; phase < 2; phase++) {
        var counter = 0;
        for (i = 0; i < 56; i++) {
            if (ties[target].indexOf(i) == -1) { // Remove ties
                // Match target answer to a movie
                var ans_match = conditions_by_phase[phase][i].indexOf(target_responses[target][counter]);
                
                // console.log("Adding entry "+i+": "+conditions_by_phase[phase][i].slice(0)); // Debugging
                
                // Update conditions, options, and target answer
                conditions[phase].push(conditions_by_phase[phase][i].slice(0));
                options[phase].push(choices_by_phase[phase][i].slice(0));
                ans[phase].push(choices_by_phase[phase][i].slice(ans_match, ans_match+1));
                                      
                counter = counter + 1;
            }         
        }
        
        // Modified version of the 'shuffle' function shuffles all options in the same order,
        // so conditions, options, and answers should correspond to each other.
        shuffle(conditions[phase], options[phase], ans[phase])
    }
    return [conditions, options, ans]
}

