import dev_config from './res/config/config.dev.json';
import prod_config from './res/config/config.prod.json';

const config = process.env.NODE_ENV === 'production'
    ? prod_config
    : dev_config;

export default {
    config
}