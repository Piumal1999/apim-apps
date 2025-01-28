/* eslint-disable */
/*
 * Copyright (c) 2024, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import Utils from './Utils';
import Resource from './Resource';
import APIClientFactory from './APIClientFactory';

/**
 * An abstract representation of GovernanceAPI
 */
class GovernanceAPI extends Resource {
    constructor(kwargs) {
        super();
        this.client = new APIClientFactory().getAPIClient(Utils.getCurrentEnvironment(),
            Utils.CONST.GOVERNANCE_CLIENT).client;
        const properties = kwargs;
        Utils.deepFreeze(properties);
        this._data = properties;
        for (const key in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, key)) {
                this[key] = properties[key];
            }
        }
    }

    /**
     * @param data
     * @returns {object} Metadata for API request
     * @private 
     */
    _requestMetaData(data = {}) {
        return {
            requestContentType: data['Content-Type'] || 'application/json',
        };
    }

    /**
     *
     * Instance method of the API class to provide raw JSON object
     * which is API body friendly to use with REST api requests
     * Use this method instead of accessing the private _data object for
     * converting to a JSON representation of an API object.
     * Note: This is deep coping, Use sparingly, Else will have a bad impact on performance
     * Basically this is the revers operation in constructor.
     * This method simply iterate through all the object properties (excluding the properties in `excludes` list)
     * and copy their values to new object.
     * So use this method with care!!
     * @memberof API
     * @param {Array} [userExcludes=[]] List of properties that are need to be excluded from the generated JSON object
     * @returns {JSON} JSON representation of the API
     */
    toJSON(userExcludes = []) {
        var copy = {},
            excludes = ['_data', 'client', 'apiType', ...userExcludes];
        for (var prop in this) {
            if (!excludes.includes(prop)) {
                copy[prop] = cloneDeep(this[prop]);
            }
        }
        return copy;
    }

    /**
     * Get list of governance policies
     * @returns {Promise} Promised policies response
     */
    getPoliciesList() {
        return this.client.then((client) => {
            return client.apis['Governance Policies'].getGovernancePolicies(
                this._requestMetaData(),
            );
        });
    }

    /**
     * Get governance policy by id
     * @param {string} policyId Policy id
     * @returns {Promise} Promised policy response
     */
    getPolicy(policyId) {
        return this.client.then((client) => {
            return client.apis['Governance Policies'].getGovernancePolicyById(
                { policyId: policyId },
                this._requestMetaData(),
            );
        });
    }

    /**
     * Add a governance policy
     * @param {object} policy Policy object
     * @returns {Promise} Promised response
     */
    addPolicy(policy) {
        return this.client.then((client) => {
            return client.apis['Governance Policies'].createGovernancePolicy(
                { 'Content-Type': 'application/json' },
                { requestBody: policy },
                this._requestMetaData(),
            );
        });
    }

    /**
     * Update a governance policy
     * @param {object} policy Policy object
     * @returns {Promise} Promised response
     */
    updatePolicy(policy) {
        console.log(policy);
        return this.client.then((client) => {
            return client.apis['Governance Policies'].updateGovernancePolicyById(
                {
                    policyId: policy.id,
                    'Content-Type': 'application/json'
                },
                { requestBody: policy },
                this._requestMetaData(),
            );
        });
    }

    /**
     * Delete a governance policy
     * @param {string} policyId Policy id
     * @returns {Promise} Promised response
     */
    deletePolicy(policyId) {
        return this.client.then((client) => {
            return client.apis['Governance Policies'].deleteGovernancePolicy(
                { policyId: policyId },
                this._requestMetaData(),
            );
        });
    }

    // rulesets
    /**
     * Get list of rulesets
     * @returns {Promise} Promised rulesets response
     */
    getRulesetsList() {
        return this.client.then((client) => {
            return client.apis['Rulesets'].getRulesets(
                this._requestMetaData(),
            );
        });
    }

    /**
     * Get ruleset by id
     * @param {string} rulesetId Ruleset id
     * @returns {Promise} Promised ruleset response
     */
    getRuleset(rulesetId) {
        return this.client.then((client) => {
            return client.apis['Rulesets'].getRulesetById(
                { rulesetId: rulesetId },
                this._requestMetaData(),
            );
        });
    }

    /**
     * Get ruleset content by id
     * @param {string} rulesetId Ruleset id
     * @returns {Promise} Promised ruleset content response
     */
    getRulesetContent(rulesetId) {
        return this.client.then((client) => {
            return client.apis['Rulesets'].getRulesetContent(
                { rulesetId: rulesetId },
                this._requestMetaData(),
            );
        });
    }

    /**
     * Add a ruleset
     * @param {object} ruleset Ruleset object
     * @returns {Promise} Promised response
     */
    addRuleset(ruleset) {
        return this.client.then((client) => {
            const payload = {
                'Content-Type': 'multipart/form-data',
            };
            return client.apis['Rulesets'].createRuleset(
                payload,
                { requestBody: ruleset },
                this._requestMetaData(),
            );
        });
    }

    /**
     * Update a ruleset
     * @param {object} ruleset Ruleset object
     * @returns {Promise} Promised response
     */
    updateRuleset(ruleset) {
        return this.client.then((client) => {
            const payload = {
                rulesetId: ruleset.id,
                'Content-Type': 'multipart/form-data',
            };
            return client.apis['Rulesets'].updateRulesetById(
                payload,
                {
                    requestBody: {
                        ...ruleset,
                        rulesetId: ruleset.id
                    }
                },
                this._requestMetaData(),
            );
        });
    }

    /**
     * Delete a ruleset
     * @param {string} rulesetId Ruleset id
     * @returns {Promise} Promised response
     */
    deleteRuleset(rulesetId) {
        return this.client.then((client) => {
            return client.apis['Rulesets'].deleteRuleset(
                { rulesetId: rulesetId },
                this._requestMetaData(),
            );
        });
    }

    /**
     * Get policy adherence for all policies
     * @returns {Promise} Promised policy adherence response
     */
    getPolicyAdherenceForAllPolicies() {
        return this.client.then((client) => {
            return client.apis['Policy Adherence'].getPolicyAdherenceForAllPolicies(
                this._requestMetaData(),
            );
        });
    }

    /**
     * Get artifact compliance for all artifacts
     * @returns {Promise} Promised artifact compliance response
     */
    getArtifactComplianceForAllArtifacts() {
        return this.client.then((client) => {
            return client.apis['Artifact Compliance'].getArtifactComplianceForAllArtifacts(
                this._requestMetaData(),
            );
        });
    }

    /**
     * Get artifact compliance by id
     * @param {string} artifactId Artifact id
     * @returns {Promise} Promised artifact compliance response
     */
    getArtifactCompliance(artifactId) {
        return this.client.then((client) => {
            return client.apis['Artifact Compliance'].getArtifactCompliance(
                { artifactId: artifactId },
                this._requestMetaData(),
            );
        });
    }
}

export default GovernanceAPI;