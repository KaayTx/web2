import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import Navbar from './Components/Navbar/Navbar';
import Router from './Components/Router/Router';

Navbar();

Router();

// Qd on a un router (navbar où on va dans plusieurs pages) -> on doit mettre juste ça dans index.js sinon ça marche pas
// Faut pas rajouter plus que ça dans index.js