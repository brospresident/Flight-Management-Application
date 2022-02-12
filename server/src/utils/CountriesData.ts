import express from 'express';
const fetch = require('node-fetch');

class CountriesData {
    public apiPath: string = 'https://countriesnow.space/api/v0.1/countries';
    public countries: Map<string, [string]> = new Map();

    private static instance: CountriesData | null = null;
    public static getInstance(): CountriesData {
        if (CountriesData.instance === null) {
            CountriesData.instance = new CountriesData();
        }

        return CountriesData.instance;
    }

    private constructor() {}

    public async getCountries(): Promise<any> {
        const countriesData: Map<string, [string]> = new Map();
        const resp = await fetch(this.apiPath);
        let data = await resp.json();
        data = data.data;

        for (const country of data) {
            countriesData.set(country.country, country.cities);
        }

        this.countries = countriesData;
    }
}

const countriesData: CountriesData = CountriesData.getInstance();

export default countriesData;