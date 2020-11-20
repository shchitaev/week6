import express from 'express';
import bodyParser from 'body-parser';

import fs from 'fs';
import crypto from 'crypto';
import http from 'http';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, fs, crypto, http);
const author = 'itmo287704'

res.setHeader('X-Author', author)
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

app.listen(process.env.PORT ?? 4321);    
