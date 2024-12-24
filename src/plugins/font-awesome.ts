import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faStar);

export default (app: any) => {
  app.component('font-awesome-icon', FontAwesomeIcon);
};
