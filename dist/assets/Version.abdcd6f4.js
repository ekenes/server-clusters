import{e as r}from"./vendor.1906794a.js";class i{constructor(t,o,e=""){this.major=t,this.minor=o,this._context=e}lessThan(t,o){return this.major<t||t===this.major&&this.minor<o}since(t,o){return!this.lessThan(t,o)}validate(t){if(this.major!==t.major){const o=this._context&&this._context+":",e=this._context&&this._context+" ";throw new r(o+"unsupported-version",`Required major ${e}version is '${this.major}', but got '\${version.major}.\${version.minor}'`,{version:t})}}clone(){return new i(this.major,this.minor,this._context)}static parse(t,o=""){const[e,n]=t.split("."),s=/^\s*\d+\s*$/;if(!e||!e.match||!e.match(s))throw new r((o&&o+":")+"invalid-version","Expected major version to be a number, but got '${version}'",{version:t});if(!n||!n.match||!n.match(s))throw new r((o&&o+":")+"invalid-version","Expected minor version to be a number, but got '${version}'",{version:t});const a=parseInt(e,10),h=parseInt(n,10);return new i(a,h,o)}}export{i as r};
