import axios from 'axios';

const requestUrl = "/kanji";

export default class KanjiServices {
    static getAll = () => {
        return axios.get(`${requestUrl}/get-all`);
    }

    static getByLevel = (level) => {
        return axios.post(`${requestUrl}/get-by-level`, { level: level });
    }

    static getByKanji = (kanji) => {
        return axios.post(`${requestUrl}/get-by-kanji`, { kanji: kanji });
    }

    static handleError = (error) => {
        console.log(`Kanji service error: ${error}`);
    }
}