import * as mysql from 'mysql'
import config from '@config'

export const db = mysql.createConnection(config.database)
