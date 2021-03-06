"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require("node-fetch");
var CodeGovAPIClient = /** @class */ (function () {
    function CodeGovAPIClient(options) {
        console.log("constructing CodeGovAPIClient");
        this.DEBUG = options && options.debug || false;
        if (options && options.base) {
            this.BASE = options.base;
        }
        else if (options && options.environment == "local") {
            this.BASE = 'http://localhost:3001/api/0.1/';
        }
        else if (options && options.environment == "staging") {
            this.BASE = 'https://code-api-staging.app.cloud.gov/api/0.1/';
        }
        else {
            this.BASE = 'https://code-api.app.cloud.gov/api/0.1/';
        }
        if (this.DEBUG)
            console.log("this.BASE:", this.BASE);
    }
    CodeGovAPIClient.prototype.getAgenciesUrl = function () {
        return this.BASE + "agencies";
    };
    /**
    * This function gets all the agencies on code.gov
    * @name getAgencies
    * @returns {Object} array of agencies
    * @example
    * client.getAgencies().then(agencies => {
    *   let count = agencies.length;
    *   console.log("There are " + count + " agencies on code.gov");
    * });
    */
    CodeGovAPIClient.prototype.getAgencies = function () {
        return fetch(this.getAgenciesUrl())
            .then(function (response) { return response.json(); })
            .then(function (data) { return data.agencies; });
    };
    CodeGovAPIClient.prototype.getAgencyReposUrl = function (agency_id, size) {
        return this.BASE + ("repos?agency.acronym=" + agency_id + "&size=" + size + "&sort=name__asc");
    };
    /**
    * This function gets all the repositories
    * by a specified agency that are licensed under
    * open-source or government wide reuse.
    * It is used to explore on code.gov.
    * @name getAgencyRepos
    * @param {string} agency_id - the agency acronymn
    * @param {number} [size=10] - the number of search results to return
    * @returns {Object} array of repositories
    * @example
    * client.getAgencyRepos("SSA").then(repositories => {
    *   console.log("Social Security Agency has these repositories ", repositories);
    * });
    */
    CodeGovAPIClient.prototype.getAgencyRepos = function (agency_id, size) {
        if (agency_id === void 0) { agency_id = ""; }
        if (size === void 0) { size = 10; }
        /*
          - permissions.usageType is "openSource" or "governmentWideReuse"
        */
        var url = this.getAgencyReposUrl(agency_id, size);
        if (this.DEBUG)
            console.log("getAgencyRepos: url:", url);
        return fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (data) { return data.repos; });
    };
    CodeGovAPIClient.prototype.getRepoByIDUrl = function (repo_id) {
        return this.BASE + ("repos/" + repo_id);
    };
    /**
    * This function gets a repository by its id
    * It is used on the project details page of code.gov.
    * @name getRepoByID
    * @param {string} repo_id - the agency acronymn
    * @returns {Object} repository - object that holds information about repo
    * @example
    * let repo_id = "nasa_dfrc_dthdata_armstrong_time_history_software_utility";
    * client.getRepoByID(repo_id).then(repository => {
    *   console.log("Repository information is ", repository);
    * });
    */
    CodeGovAPIClient.prototype.getRepoByID = function (repo_id) {
        if (repo_id === void 0) { repo_id = ""; }
        var url = this.getRepoByIDUrl(repo_id);
        return fetch(url).then(function (response) { return response.json(); });
    };
    /**
     * The suggest function takes in a search term then
     * returns auto-complete / type-ahead suggestions.
     * It is used by the search boxes on code.gov.
     * @function
     * @name suggest
     * @param {string} term - the term to search by
     * @param {number} [size=10] - the number of search results to return
     * @returns {Object} array of search result objects
     * @example
     * client.suggest("space").then(terms => {
     *   console.log("Terms that are related to space", terms);
     * });
     */
    CodeGovAPIClient.prototype.suggest = function (term, size) {
        if (term === void 0) { term = ""; }
        if (size === void 0) { size = 10; }
        if (term && term.length > 2) {
            var url = this.BASE + ("terms?_fulltext=" + term + "&size=" + size);
            if (this.DEBUG)
                console.log("getAgencyRepos: url:", url);
            return fetch(url)
                .then(function (response) { return response.json(); })
                .then(function (data) { return data.terms; });
        }
        else {
            return Promise.resolve([]);
        }
    };
    CodeGovAPIClient.prototype.getSearchUrl = function (text, size) {
        return this.BASE + ("repos?q=" + text + "&size=" + size);
    };
    /**
     * This function searches all of the repositories
     * based on a string of text.
     * @function
     * @name search
     * @param {string} text - the text to search by
     * @returns {Object} array of search result repos
     * client.search("services").then(repos => {
     *   console.log("Repos related to services are", repos);
     * });
     */
    CodeGovAPIClient.prototype.search = function (text, size) {
        if (text === void 0) { text = ""; }
        if (size === void 0) { size = 10; }
        if (text && text.length > 0) {
            var url = this.getSearchUrl(text, size);
            if (this.DEBUG)
                console.log("result repos:", url);
            return fetch(url).then(function (response) { return response.json(); });
        }
    };
    return CodeGovAPIClient;
}());
exports.CodeGovAPIClient = CodeGovAPIClient;
var AngularCodeGovAPIClient = /** @class */ (function () {
    function AngularCodeGovAPIClient() {
    }
    return AngularCodeGovAPIClient;
}());
exports.AngularCodeGovAPIClient = AngularCodeGovAPIClient;
//# sourceMappingURL=index.js.map