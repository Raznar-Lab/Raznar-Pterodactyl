"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateLocation_1 = __importDefault(require("./locations/CreateLocation"));
const DeleteLocation_1 = __importDefault(require("./locations/DeleteLocation"));
const GetLocationDetails_1 = __importDefault(require("./locations/GetLocationDetails"));
const GetLocations_1 = __importDefault(require("./locations/GetLocations"));
const UpdateLocation_1 = __importDefault(require("./locations/UpdateLocation"));
const GetNestDetails_1 = __importDefault(require("./nests/GetNestDetails"));
const GetNests_1 = __importDefault(require("./nests/GetNests"));
const GetEggDetails_1 = __importDefault(require("./nests/eggs/GetEggDetails"));
const GetEggs_1 = __importDefault(require("./nests/eggs/GetEggs"));
class Admin {
    constructor(_request) {
        this._request = _request;
        this.location = new LocationAdmin(this._request);
        this.nests = new NestsAdmin(this._request);
    }
}
exports.default = Admin;
class LocationAdmin {
    constructor(_request) {
        this._request = _request;
        this.create = (shortCode, description) => CreateLocation_1.default(this._request, shortCode, description);
        this.delete = (locationID) => DeleteLocation_1.default(this._request, locationID);
        this.getDetails = (locationID) => GetLocationDetails_1.default(this._request, locationID);
        this.getAll = () => GetLocations_1.default(this._request);
        this.update = (locationID, shortCode, description) => UpdateLocation_1.default(this._request, locationID, shortCode, description);
    }
}
class NestsAdmin {
    constructor(_request) {
        this._request = _request;
        this.getDetails = (nestID) => GetNestDetails_1.default(this._request, nestID);
        this.getAll = () => GetNests_1.default(this._request);
        this.eggs = new EggsAdmin(this._request);
    }
}
class EggsAdmin {
    constructor(_request) {
        this._request = _request;
        this.getDetails = (nestID, eggID) => GetEggDetails_1.default(this._request, nestID, eggID);
        this.getAll = (nestID) => GetEggs_1.default(this._request, nestID);
    }
}
