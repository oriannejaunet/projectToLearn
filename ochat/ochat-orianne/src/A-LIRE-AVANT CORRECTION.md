# CARNET DE BORD

## J1 : 27/10/2025

J'ai fais les wireframes pour smartphone et ordinateur et en version 
"utilisateur connecté" avec un bouton de déconnexion et une version 
"connexion" avec une modale demandant la clé de connexion à l'utilisateur.

J'ai fais le HTML et le CSS pour la version smartphone, puis j'ai adapté à
l'aide des media queries pour la version ordinateur.
J'ai ajouté un reset.css pour m'aider à la réalisation du css.

Pour la version smartphone, j'ai fais le choix de ne pas affiché la zone de gestion des conversations sur la page d'accueil, elle est disponible en appuyant sur le bouton "☰". Ce n'était pas prévu sur mon wireframe mais j'ai trouvé cela plus judicieux étant donné la petite taille de l'écran smartphone.

Je n'ai pas eu le temps de créer la modale.
J'ai découvert de nouvelles notions : 
- le .innerWidth pour gérer la taille d'écran
- le flex : 1 par exemple qui gère l'emplacement des zones

## J2 : 28/10/2025

J'ai crée une modale qui demande la clé à l'utilisateur, si la clé est toujours présente dans le local storage, elle n'est pas redemandée.

J'ai fais appel à l'API de mistral pour converser. J'ai appris beaucoup de nouvelles notions : 
- l'utilisation du spread opérateur qui ne m'était pas familière
- l'utilisation du try catch() pour gérer les erreurs
- la méthode map()

Je me suis beaucoup servie de la documentation et de l'IA pour cette journée.

J'ai réalisé le bonus et donc l'IA sait lire le Markdown

## J3 : 29/10/2025

J'ai ajouté pocket base à mon projet, j'ai eu du mal à me souvenir de la procédure donc je me suis aidée de la documentation.
J'ai appris de nouvelles notion : 
- l'utilisation de throw() en association avec catch pour gérer les erreurs
- l'utilisation de map() pour sectionner mon tableau

J'ai aussi reéaliser les consignes du jour 4 car j'avais terminé en début d'après midi, j'ai créer une nouvelle collection dans pocket base pour stocker les conversations, que j'ai mis en relation avec les messages. 

J'ai ensuite amélioré mon CSS.
Je n'arrive pas a centrer ma modale présente si pas de clé dans le local storage...

J'ai aussi repassé en revue tout mon code pour commenter chaque ligne, ce qui me permettra de revenir dessus dans quelques temps pour réviser.

## J3 en soirée

J'ai terminé le css et fini la gestion des conversations