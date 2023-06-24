// esbuild-shims.js
globalThis.require = (name2) => {
  if (name2 === "ethers") {
    return ethers;
  }
  throw new Error("unknown module " + name2);
};

// ecdsa-sd-2023-cryptosuite.js
var ecdsa_sd_2023_cryptosuite_exports = {};
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (const name2 in all) {
    __defProp(target, name2, { get: all[name2], enumerable: true });
  }
};
var __copyProps = (to, from2, except, desc) => {
  if ((from2 && typeof from2 === "object") || typeof from2 === "function") {
    for (const key of __getOwnPropNames(from2)) {
      if (!__hasOwnProp.call(to, key) && key !== except) {
        __defProp(to, key, {
          get: () => from2[key],
          enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable,
        });
      }
    }
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var require_IdentifierIssuer = __commonJS({
  "node_modules/rdf-canonize/lib/IdentifierIssuer.js"(exports, module2) {
    "use strict";
    module2.exports = class IdentifierIssuer {
      /**
       * Creates a new IdentifierIssuer. A IdentifierIssuer issues unique
       * identifiers, keeping track of any previously issued identifiers.
       *
       * @param prefix - The prefix to use ('<prefix><counter>').
       * @param existing - An existing Map to use.
       * @param counter - The counter to use.
       */
      constructor(prefix, existing = /* @__PURE__ */ new Map(), counter = 0) {
        this.prefix = prefix;
        this._existing = existing;
        this.counter = counter;
      }
      /**
       * Copies this IdentifierIssuer.
       *
       * @returns A copy of this IdentifierIssuer.
       */
      clone() {
        const { prefix, _existing, counter } = this;
        return new IdentifierIssuer(prefix, new Map(_existing), counter);
      }
      /**
       * Gets the new identifier for the given old identifier, where if no old
       * identifier is given a new identifier will be generated.
       *
       * @param [old] - The old identifier to get the new identifier for.
       *
       * @returns The new identifier.
       */
      getId(old) {
        const existing = old && this._existing.get(old);
        if (existing) {
          return existing;
        }
        const identifier = this.prefix + this.counter;
        this.counter++;
        if (old) {
          this._existing.set(old, identifier);
        }
        return identifier;
      }
      /**
       * Returns true if the given old identifer has already been assigned a new
       * identifier.
       *
       * @param old - The old identifier to check.
       *
       * @returns True if the old identifier has been assigned a new identifier,
       *   false if not.
       */
      hasId(old) {
        return this._existing.has(old);
      }
      /**
       * Returns all of the IDs that have been issued new IDs in the order in
       * which they were issued new IDs.
       *
       * @returns The list of old IDs that has been issued new IDs in order.
       */
      getOldIds() {
        return [...this._existing.keys()];
      }
    };
  },
});
var require_MessageDigest = __commonJS({
  "node_modules/rdf-canonize/lib/MessageDigest.js"(exports, module2) {
    "use strict";
    const crypto3 = crypto; //import("https://deno.land/std@0.192.0/crypto/mod.ts");
    // const crypto3 = require("node:crypto");
    module2.exports = class MessageDigest {
      /**
       * Creates a new MessageDigest.
       *
       * @param algorithm - The algorithm to use.
       */
      constructor(algorithm) {
        this.md = crypto3.createHash(algorithm);
      }
      update(msg) {
        this.md.update(msg, "utf8");
      }
      digest() {
        return this.md.digest("hex");
      }
    };
  },
});
var require_Permuter = __commonJS({
  "node_modules/rdf-canonize/lib/Permuter.js"(exports, module2) {
    "use strict";
    module2.exports = class Permuter {
      /**
       * A Permuter iterates over all possible permutations of the given array
       * of elements.
       *
       * @param list - The array of elements to iterate over.
       */
      constructor(list) {
        this.current = list.sort();
        this.done = false;
        this.dir = /* @__PURE__ */ new Map();
        for (let i = 0; i < list.length; ++i) {
          this.dir.set(list[i], true);
        }
      }
      /**
       * Returns true if there is another permutation.
       *
       * @returns True if there is another permutation, false if not.
       */
      hasNext() {
        return !this.done;
      }
      /**
       * Gets the next permutation. Call hasNext() to ensure there is another one
       * first.
       *
       * @returns The next permutation.
       */
      next() {
        const { current, dir } = this;
        const rval = current.slice();
        let k = null;
        let pos = 0;
        const length = current.length;
        for (let i = 0; i < length; ++i) {
          const element = current[i];
          const left = dir.get(element);
          if (
            (k === null || element > k) &&
            ((left && i > 0 && element > current[i - 1]) ||
              (!left && i < length - 1 && element > current[i + 1]))
          ) {
            k = element;
            pos = i;
          }
        }
        if (k === null) {
          this.done = true;
        } else {
          const swap = dir.get(k) ? pos - 1 : pos + 1;
          current[pos] = current[swap];
          current[swap] = k;
          for (const element of current) {
            if (element > k) {
              dir.set(element, !dir.get(element));
            }
          }
        }
        return rval;
      }
    };
  },
});
var require_NQuads = __commonJS({
  "node_modules/rdf-canonize/lib/NQuads.js"(exports, module2) {
    "use strict";
    const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
    const RDF_LANGSTRING = RDF + "langString";
    const XSD_STRING = "http://www.w3.org/2001/XMLSchema#string";
    const TYPE_NAMED_NODE = "NamedNode";
    const TYPE_BLANK_NODE = "BlankNode";
    const TYPE_LITERAL = "Literal";
    const TYPE_DEFAULT_GRAPH = "DefaultGraph";
    const REGEX = {};
    (() => {
      const iri = "(?:<([^:]+:[^>]*)>)";
      const PN_CHARS_BASE =
        "A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";
      const PN_CHARS_U = PN_CHARS_BASE + "_";
      const PN_CHARS = PN_CHARS_U + "0-9-\xB7\u0300-\u036F\u203F-\u2040";
      const BLANK_NODE_LABEL =
        "(_:(?:[" +
        PN_CHARS_U +
        "0-9])(?:(?:[" +
        PN_CHARS +
        ".])*(?:[" +
        PN_CHARS +
        "]))?)";
      const bnode = BLANK_NODE_LABEL;
      const plain = '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"';
      const datatype = "(?:\\^\\^" + iri + ")";
      const language = "(?:@([a-zA-Z]+(?:-[a-zA-Z0-9]+)*))";
      const literal = "(?:" + plain + "(?:" + datatype + "|" + language + ")?)";
      const ws = "[ \\t]+";
      const wso = "[ \\t]*";
      const subject = "(?:" + iri + "|" + bnode + ")" + ws;
      const property = iri + ws;
      const object = "(?:" + iri + "|" + bnode + "|" + literal + ")" + wso;
      const graphName =
        "(?:\\.|(?:(?:" + iri + "|" + bnode + ")" + wso + "\\.))";
      REGEX.eoln = /(?:\r\n)|(?:\n)|(?:\r)/g;
      REGEX.empty = new RegExp("^" + wso + "$");
      REGEX.quad = new RegExp(
        "^" + wso + subject + property + object + graphName + wso + "$"
      );
    })();
    module2.exports = class NQuads2 {
      /**
       * Parses RDF in the form of N-Quads.
       *
       * @param input - The N-Quads input to parse.
       *
       * @returns An RDF dataset (an array of quads per http://rdf.js.org/).
       */
      static parse(input) {
        const dataset = [];
        const graphs = {};
        const lines = input.split(REGEX.eoln);
        let lineNumber = 0;
        for (const line of lines) {
          lineNumber++;
          if (REGEX.empty.test(line)) {
            continue;
          }
          const match = line.match(REGEX.quad);
          if (match === null) {
            throw new Error("N-Quads parse error on line " + lineNumber + ".");
          }
          const quad = {
            subject: null,
            predicate: null,
            object: null,
            graph: null,
          };
          if (match[1] !== void 0) {
            quad.subject = { termType: TYPE_NAMED_NODE, value: match[1] };
          } else {
            quad.subject = { termType: TYPE_BLANK_NODE, value: match[2] };
          }
          quad.predicate = { termType: TYPE_NAMED_NODE, value: match[3] };
          if (match[4] !== void 0) {
            quad.object = { termType: TYPE_NAMED_NODE, value: match[4] };
          } else if (match[5] !== void 0) {
            quad.object = { termType: TYPE_BLANK_NODE, value: match[5] };
          } else {
            quad.object = {
              termType: TYPE_LITERAL,
              value: void 0,
              datatype: {
                termType: TYPE_NAMED_NODE,
              },
            };
            if (match[7] !== void 0) {
              quad.object.datatype.value = match[7];
            } else if (match[8] !== void 0) {
              quad.object.datatype.value = RDF_LANGSTRING;
              quad.object.language = match[8];
            } else {
              quad.object.datatype.value = XSD_STRING;
            }
            quad.object.value = _unescape(match[6]);
          }
          if (match[9] !== void 0) {
            quad.graph = {
              termType: TYPE_NAMED_NODE,
              value: match[9],
            };
          } else if (match[10] !== void 0) {
            quad.graph = {
              termType: TYPE_BLANK_NODE,
              value: match[10],
            };
          } else {
            quad.graph = {
              termType: TYPE_DEFAULT_GRAPH,
              value: "",
            };
          }
          if (!(quad.graph.value in graphs)) {
            graphs[quad.graph.value] = [quad];
            dataset.push(quad);
          } else {
            let unique = true;
            const quads = graphs[quad.graph.value];
            for (const q of quads) {
              if (_compareTriples(q, quad)) {
                unique = false;
                break;
              }
            }
            if (unique) {
              quads.push(quad);
              dataset.push(quad);
            }
          }
        }
        return dataset;
      }
      /**
       * Converts an RDF dataset to N-Quads.
       *
       * @param dataset - (array of quads) the RDF dataset to convert.
       *
       * @returns The N-Quads string.
       */
      static serialize(dataset) {
        if (!Array.isArray(dataset)) {
          dataset = NQuads2.legacyDatasetToQuads(dataset);
        }
        const quads = [];
        for (const quad of dataset) {
          quads.push(NQuads2.serializeQuad(quad));
        }
        return quads.sort().join("");
      }
      /**
       * Converts RDF quad components to an N-Quad string (a single quad).
       *
       * @param {object} s - N-Quad subject component.
       * @param {object} p - N-Quad predicate component.
       * @param {object} o - N-Quad object component.
       * @param {object} g - N-Quad graph component.
       *
       * @returns {string} The N-Quad.
       */
      static serializeQuadComponents(s, p, o, g) {
        let nquad = "";
        if (s.termType === TYPE_NAMED_NODE) {
          nquad += `<${s.value}>`;
        } else {
          nquad += `${s.value}`;
        }
        nquad += ` <${p.value}> `;
        if (o.termType === TYPE_NAMED_NODE) {
          nquad += `<${o.value}>`;
        } else if (o.termType === TYPE_BLANK_NODE) {
          nquad += o.value;
        } else {
          nquad += `"${_escape(o.value)}"`;
          if (o.datatype.value === RDF_LANGSTRING) {
            if (o.language) {
              nquad += `@${o.language}`;
            }
          } else if (o.datatype.value !== XSD_STRING) {
            nquad += `^^<${o.datatype.value}>`;
          }
        }
        if (g.termType === TYPE_NAMED_NODE) {
          nquad += ` <${g.value}>`;
        } else if (g.termType === TYPE_BLANK_NODE) {
          nquad += ` ${g.value}`;
        }
        nquad += " .\n";
        return nquad;
      }
      /**
       * Converts an RDF quad to an N-Quad string (a single quad).
       *
       * @param quad - The RDF quad convert.
       *
       * @returns The N-Quad string.
       */
      static serializeQuad(quad) {
        return NQuads2.serializeQuadComponents(
          quad.subject,
          quad.predicate,
          quad.object,
          quad.graph
        );
      }
      /**
       * Converts a legacy-formatted dataset to an array of quads dataset per
       * http://rdf.js.org/.
       *
       * @param dataset - The legacy dataset to convert.
       *
       * @returns The array of quads dataset.
       */
      static legacyDatasetToQuads(dataset) {
        const quads = [];
        const termTypeMap = {
          "blank node": TYPE_BLANK_NODE,
          IRI: TYPE_NAMED_NODE,
          literal: TYPE_LITERAL,
        };
        for (const graphName in dataset) {
          const triples = dataset[graphName];
          triples.forEach((triple) => {
            const quad = {};
            for (const componentName in triple) {
              const oldComponent = triple[componentName];
              const newComponent = {
                termType: termTypeMap[oldComponent.type],
                value: oldComponent.value,
              };
              if (newComponent.termType === TYPE_LITERAL) {
                newComponent.datatype = {
                  termType: TYPE_NAMED_NODE,
                };
                if ("datatype" in oldComponent) {
                  newComponent.datatype.value = oldComponent.datatype;
                }
                if ("language" in oldComponent) {
                  if (!("datatype" in oldComponent)) {
                    newComponent.datatype.value = RDF_LANGSTRING;
                  }
                  newComponent.language = oldComponent.language;
                } else if (!("datatype" in oldComponent)) {
                  newComponent.datatype.value = XSD_STRING;
                }
              }
              quad[componentName] = newComponent;
            }
            if (graphName === "@default") {
              quad.graph = {
                termType: TYPE_DEFAULT_GRAPH,
                value: "",
              };
            } else {
              quad.graph = {
                termType: graphName.startsWith("_:")
                  ? TYPE_BLANK_NODE
                  : TYPE_NAMED_NODE,
                value: graphName,
              };
            }
            quads.push(quad);
          });
        }
        return quads;
      }
    };
    function _compareTriples(t1, t2) {
      if (
        !(
          t1.subject.termType === t2.subject.termType &&
          t1.object.termType === t2.object.termType
        )
      ) {
        return false;
      }
      if (
        !(
          t1.subject.value === t2.subject.value &&
          t1.predicate.value === t2.predicate.value &&
          t1.object.value === t2.object.value
        )
      ) {
        return false;
      }
      if (t1.object.termType !== TYPE_LITERAL) {
        return true;
      }
      return (
        t1.object.datatype.termType === t2.object.datatype.termType &&
        t1.object.language === t2.object.language &&
        t1.object.datatype.value === t2.object.datatype.value
      );
    }
    const _escapeRegex = /["\\\n\r]/g;
    function _escape(s) {
      return s.replace(_escapeRegex, function (match) {
        switch (match) {
          case '"':
            return '\\"';
          case "\\":
            return "\\\\";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
        }
      });
    }
    const _unescapeRegex =
      /(?:\\([tbnrf"'\\]))|(?:\\u([0-9A-Fa-f]{4}))|(?:\\U([0-9A-Fa-f]{8}))/g;
    function _unescape(s) {
      return s.replace(_unescapeRegex, function (match, code, u, U) {
        if (code) {
          switch (code) {
            case "t":
              return "	";
            case "b":
              return "\b";
            case "n":
              return "\n";
            case "r":
              return "\r";
            case "f":
              return "\f";
            case '"':
              return '"';
            case "'":
              return "'";
            case "\\":
              return "\\";
          }
        }
        if (u) {
          return String.fromCharCode(parseInt(u, 16));
        }
        if (U) {
          throw new Error("Unsupported U escape");
        }
      });
    }
  },
});
var require_URDNA2015 = __commonJS({
  "node_modules/rdf-canonize/lib/URDNA2015.js"(exports, module2) {
    "use strict";
    const IdentifierIssuer = require_IdentifierIssuer();
    const MessageDigest = require_MessageDigest();
    const Permuter = require_Permuter();
    const NQuads2 = require_NQuads();
    module2.exports = class URDNA2015 {
      constructor({
        createMessageDigest = () => new MessageDigest("sha256"),
        canonicalIdMap = /* @__PURE__ */ new Map(),
        maxDeepIterations = Infinity,
      } = {}) {
        this.name = "URDNA2015";
        this.blankNodeInfo = /* @__PURE__ */ new Map();
        this.canonicalIssuer = new IdentifierIssuer("_:c14n", canonicalIdMap);
        this.createMessageDigest = createMessageDigest;
        this.maxDeepIterations = maxDeepIterations;
        this.quads = null;
        this.deepIterations = null;
      }
      // 4.4) Normalization Algorithm
      async main(dataset) {
        this.deepIterations = /* @__PURE__ */ new Map();
        this.quads = dataset;
        for (const quad of dataset) {
          this._addBlankNodeQuadInfo({ quad, component: quad.subject });
          this._addBlankNodeQuadInfo({ quad, component: quad.object });
          this._addBlankNodeQuadInfo({ quad, component: quad.graph });
        }
        const hashToBlankNodes = /* @__PURE__ */ new Map();
        const nonNormalized = [...this.blankNodeInfo.keys()];
        let i = 0;
        for (const id of nonNormalized) {
          if (++i % 100 === 0) {
            await this._yield();
          }
          await this._hashAndTrackBlankNode({ id, hashToBlankNodes });
        }
        const hashes = [...hashToBlankNodes.keys()].sort();
        const nonUnique = [];
        for (const hash of hashes) {
          const idList = hashToBlankNodes.get(hash);
          if (idList.length > 1) {
            nonUnique.push(idList);
            continue;
          }
          const id = idList[0];
          this.canonicalIssuer.getId(id);
        }
        for (const idList of nonUnique) {
          const hashPathList = [];
          for (const id of idList) {
            if (this.canonicalIssuer.hasId(id)) {
              continue;
            }
            const issuer = new IdentifierIssuer("_:b");
            issuer.getId(id);
            const result = await this.hashNDegreeQuads(id, issuer);
            hashPathList.push(result);
          }
          hashPathList.sort(_stringHashCompare);
          for (const result of hashPathList) {
            const oldIds = result.issuer.getOldIds();
            for (const id of oldIds) {
              this.canonicalIssuer.getId(id);
            }
          }
        }
        const normalized = [];
        for (const quad of this.quads) {
          const nQuad = NQuads2.serializeQuadComponents(
            this._componentWithCanonicalId(quad.subject),
            quad.predicate,
            this._componentWithCanonicalId(quad.object),
            this._componentWithCanonicalId(quad.graph)
          );
          normalized.push(nQuad);
        }
        normalized.sort();
        return normalized.join("");
      }
      // 4.6) Hash First Degree Quads
      async hashFirstDegreeQuads(id) {
        const nquads = [];
        const info = this.blankNodeInfo.get(id);
        const quads = info.quads;
        for (const quad of quads) {
          const copy = {
            subject: null,
            predicate: quad.predicate,
            object: null,
            graph: null,
          };
          copy.subject = this.modifyFirstDegreeComponent(
            id,
            quad.subject,
            "subject"
          );
          copy.object = this.modifyFirstDegreeComponent(
            id,
            quad.object,
            "object"
          );
          copy.graph = this.modifyFirstDegreeComponent(id, quad.graph, "graph");
          nquads.push(NQuads2.serializeQuad(copy));
        }
        nquads.sort();
        const md = this.createMessageDigest();
        for (const nquad of nquads) {
          md.update(nquad);
        }
        info.hash = await md.digest();
        return info.hash;
      }
      // 4.7) Hash Related Blank Node
      async hashRelatedBlankNode(related, quad, issuer, position) {
        let id;
        if (this.canonicalIssuer.hasId(related)) {
          id = this.canonicalIssuer.getId(related);
        } else if (issuer.hasId(related)) {
          id = issuer.getId(related);
        } else {
          id = this.blankNodeInfo.get(related).hash;
        }
        const md = this.createMessageDigest();
        md.update(position);
        if (position !== "g") {
          md.update(this.getRelatedPredicate(quad));
        }
        md.update(id);
        return md.digest();
      }
      // 4.8) Hash N-Degree Quads
      async hashNDegreeQuads(id, issuer) {
        const deepIterations = this.deepIterations.get(id) || 0;
        if (deepIterations > this.maxDeepIterations) {
          throw new Error(
            `Maximum deep iterations (${this.maxDeepIterations}) exceeded.`
          );
        }
        this.deepIterations.set(id, deepIterations + 1);
        const md = this.createMessageDigest();
        const hashToRelated = await this.createHashToRelated(id, issuer);
        const hashes = [...hashToRelated.keys()].sort();
        for (const hash of hashes) {
          md.update(hash);
          let chosenPath = "";
          let chosenIssuer;
          const permuter = new Permuter(hashToRelated.get(hash));
          let i = 0;
          while (permuter.hasNext()) {
            const permutation = permuter.next();
            if (++i % 3 === 0) {
              await this._yield();
            }
            let issuerCopy = issuer.clone();
            let path = "";
            const recursionList = [];
            let nextPermutation = false;
            for (const related of permutation) {
              if (this.canonicalIssuer.hasId(related)) {
                path += this.canonicalIssuer.getId(related);
              } else {
                if (!issuerCopy.hasId(related)) {
                  recursionList.push(related);
                }
                path += issuerCopy.getId(related);
              }
              if (chosenPath.length !== 0 && path > chosenPath) {
                nextPermutation = true;
                break;
              }
            }
            if (nextPermutation) {
              continue;
            }
            for (const related of recursionList) {
              const result = await this.hashNDegreeQuads(related, issuerCopy);
              path += issuerCopy.getId(related);
              path += `<${result.hash}>`;
              issuerCopy = result.issuer;
              if (chosenPath.length !== 0 && path > chosenPath) {
                nextPermutation = true;
                break;
              }
            }
            if (nextPermutation) {
              continue;
            }
            if (chosenPath.length === 0 || path < chosenPath) {
              chosenPath = path;
              chosenIssuer = issuerCopy;
            }
          }
          md.update(chosenPath);
          issuer = chosenIssuer;
        }
        return { hash: await md.digest(), issuer };
      }
      // helper for modifying component during Hash First Degree Quads
      modifyFirstDegreeComponent(id, component) {
        if (component.termType !== "BlankNode") {
          return component;
        }
        return {
          termType: "BlankNode",
          value: component.value === id ? "_:a" : "_:z",
        };
      }
      // helper for getting a related predicate
      getRelatedPredicate(quad) {
        return `<${quad.predicate.value}>`;
      }
      // helper for creating hash to related blank nodes map
      async createHashToRelated(id, issuer) {
        const hashToRelated = /* @__PURE__ */ new Map();
        const quads = this.blankNodeInfo.get(id).quads;
        let i = 0;
        for (const quad of quads) {
          if (++i % 100 === 0) {
            await this._yield();
          }
          await Promise.all([
            this._addRelatedBlankNodeHash({
              quad,
              component: quad.subject,
              position: "s",
              id,
              issuer,
              hashToRelated,
            }),
            this._addRelatedBlankNodeHash({
              quad,
              component: quad.object,
              position: "o",
              id,
              issuer,
              hashToRelated,
            }),
            this._addRelatedBlankNodeHash({
              quad,
              component: quad.graph,
              position: "g",
              id,
              issuer,
              hashToRelated,
            }),
          ]);
        }
        return hashToRelated;
      }
      async _hashAndTrackBlankNode({ id, hashToBlankNodes }) {
        const hash = await this.hashFirstDegreeQuads(id);
        const idList = hashToBlankNodes.get(hash);
        if (!idList) {
          hashToBlankNodes.set(hash, [id]);
        } else {
          idList.push(id);
        }
      }
      _addBlankNodeQuadInfo({ quad, component }) {
        if (component.termType !== "BlankNode") {
          return;
        }
        const id = component.value;
        const info = this.blankNodeInfo.get(id);
        if (info) {
          info.quads.add(quad);
        } else {
          this.blankNodeInfo.set(id, {
            quads: /* @__PURE__ */ new Set([quad]),
            hash: null,
          });
        }
      }
      async _addRelatedBlankNodeHash({
        quad,
        component,
        position,
        id,
        issuer,
        hashToRelated,
      }) {
        if (!(component.termType === "BlankNode" && component.value !== id)) {
          return;
        }
        const related = component.value;
        const hash = await this.hashRelatedBlankNode(
          related,
          quad,
          issuer,
          position
        );
        const entries = hashToRelated.get(hash);
        if (entries) {
          entries.push(related);
        } else {
          hashToRelated.set(hash, [related]);
        }
      }
      // canonical ids for 7.1
      _componentWithCanonicalId(component) {
        if (
          component.termType === "BlankNode" &&
          !component.value.startsWith(this.canonicalIssuer.prefix)
        ) {
          return {
            termType: "BlankNode",
            value: this.canonicalIssuer.getId(component.value),
          };
        }
        return component;
      }
      async _yield() {
        return new Promise((resolve) => setImmediate(resolve));
      }
    };
    function _stringHashCompare(a, b) {
      return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
    }
  },
});
var require_URGNA2012 = __commonJS({
  "node_modules/rdf-canonize/lib/URGNA2012.js"(exports, module2) {
    "use strict";
    const MessageDigest = require_MessageDigest();
    const URDNA2015 = require_URDNA2015();
    module2.exports = class URDNA2012 extends URDNA2015 {
      constructor() {
        super();
        this.name = "URGNA2012";
        this.createMessageDigest = () => new MessageDigest("sha1");
      }
      // helper for modifying component during Hash First Degree Quads
      modifyFirstDegreeComponent(id, component, key) {
        if (component.termType !== "BlankNode") {
          return component;
        }
        if (key === "graph") {
          return {
            termType: "BlankNode",
            value: "_:g",
          };
        }
        return {
          termType: "BlankNode",
          value: component.value === id ? "_:a" : "_:z",
        };
      }
      // helper for getting a related predicate
      getRelatedPredicate(quad) {
        return quad.predicate.value;
      }
      // helper for creating hash to related blank nodes map
      async createHashToRelated(id, issuer) {
        const hashToRelated = /* @__PURE__ */ new Map();
        const quads = this.blankNodeInfo.get(id).quads;
        let i = 0;
        for (const quad of quads) {
          let position;
          let related;
          if (
            quad.subject.termType === "BlankNode" &&
            quad.subject.value !== id
          ) {
            related = quad.subject.value;
            position = "p";
          } else if (
            quad.object.termType === "BlankNode" &&
            quad.object.value !== id
          ) {
            related = quad.object.value;
            position = "r";
          } else {
            continue;
          }
          if (++i % 100 === 0) {
            await this._yield();
          }
          const hash = await this.hashRelatedBlankNode(
            related,
            quad,
            issuer,
            position
          );
          const entries = hashToRelated.get(hash);
          if (entries) {
            entries.push(related);
          } else {
            hashToRelated.set(hash, [related]);
          }
        }
        return hashToRelated;
      }
    };
  },
});
var require_URDNA2015Sync = __commonJS({
  "node_modules/rdf-canonize/lib/URDNA2015Sync.js"(exports, module2) {
    "use strict";
    const IdentifierIssuer = require_IdentifierIssuer();
    const MessageDigest = require_MessageDigest();
    const Permuter = require_Permuter();
    const NQuads2 = require_NQuads();
    module2.exports = class URDNA2015Sync {
      constructor({
        createMessageDigest = () => new MessageDigest("sha256"),
        canonicalIdMap = /* @__PURE__ */ new Map(),
        maxDeepIterations = Infinity,
      } = {}) {
        this.name = "URDNA2015";
        this.blankNodeInfo = /* @__PURE__ */ new Map();
        this.canonicalIssuer = new IdentifierIssuer("_:c14n", canonicalIdMap);
        this.createMessageDigest = createMessageDigest;
        this.maxDeepIterations = maxDeepIterations;
        this.quads = null;
        this.deepIterations = null;
      }
      // 4.4) Normalization Algorithm
      main(dataset) {
        this.deepIterations = /* @__PURE__ */ new Map();
        this.quads = dataset;
        for (const quad of dataset) {
          this._addBlankNodeQuadInfo({ quad, component: quad.subject });
          this._addBlankNodeQuadInfo({ quad, component: quad.object });
          this._addBlankNodeQuadInfo({ quad, component: quad.graph });
        }
        const hashToBlankNodes = /* @__PURE__ */ new Map();
        const nonNormalized = [...this.blankNodeInfo.keys()];
        for (const id of nonNormalized) {
          this._hashAndTrackBlankNode({ id, hashToBlankNodes });
        }
        const hashes = [...hashToBlankNodes.keys()].sort();
        const nonUnique = [];
        for (const hash of hashes) {
          const idList = hashToBlankNodes.get(hash);
          if (idList.length > 1) {
            nonUnique.push(idList);
            continue;
          }
          const id = idList[0];
          this.canonicalIssuer.getId(id);
        }
        for (const idList of nonUnique) {
          const hashPathList = [];
          for (const id of idList) {
            if (this.canonicalIssuer.hasId(id)) {
              continue;
            }
            const issuer = new IdentifierIssuer("_:b");
            issuer.getId(id);
            const result = this.hashNDegreeQuads(id, issuer);
            hashPathList.push(result);
          }
          hashPathList.sort(_stringHashCompare);
          for (const result of hashPathList) {
            const oldIds = result.issuer.getOldIds();
            for (const id of oldIds) {
              this.canonicalIssuer.getId(id);
            }
          }
        }
        const normalized = [];
        for (const quad of this.quads) {
          const nQuad = NQuads2.serializeQuadComponents(
            this._componentWithCanonicalId({ component: quad.subject }),
            quad.predicate,
            this._componentWithCanonicalId({ component: quad.object }),
            this._componentWithCanonicalId({ component: quad.graph })
          );
          normalized.push(nQuad);
        }
        normalized.sort();
        return normalized.join("");
      }
      // 4.6) Hash First Degree Quads
      hashFirstDegreeQuads(id) {
        const nquads = [];
        const info = this.blankNodeInfo.get(id);
        const quads = info.quads;
        for (const quad of quads) {
          const copy = {
            subject: null,
            predicate: quad.predicate,
            object: null,
            graph: null,
          };
          copy.subject = this.modifyFirstDegreeComponent(
            id,
            quad.subject,
            "subject"
          );
          copy.object = this.modifyFirstDegreeComponent(
            id,
            quad.object,
            "object"
          );
          copy.graph = this.modifyFirstDegreeComponent(id, quad.graph, "graph");
          nquads.push(NQuads2.serializeQuad(copy));
        }
        nquads.sort();
        const md = this.createMessageDigest();
        for (const nquad of nquads) {
          md.update(nquad);
        }
        info.hash = md.digest();
        return info.hash;
      }
      // 4.7) Hash Related Blank Node
      hashRelatedBlankNode(related, quad, issuer, position) {
        let id;
        if (this.canonicalIssuer.hasId(related)) {
          id = this.canonicalIssuer.getId(related);
        } else if (issuer.hasId(related)) {
          id = issuer.getId(related);
        } else {
          id = this.blankNodeInfo.get(related).hash;
        }
        const md = this.createMessageDigest();
        md.update(position);
        if (position !== "g") {
          md.update(this.getRelatedPredicate(quad));
        }
        md.update(id);
        return md.digest();
      }
      // 4.8) Hash N-Degree Quads
      hashNDegreeQuads(id, issuer) {
        const deepIterations = this.deepIterations.get(id) || 0;
        if (deepIterations > this.maxDeepIterations) {
          throw new Error(
            `Maximum deep iterations (${this.maxDeepIterations}) exceeded.`
          );
        }
        this.deepIterations.set(id, deepIterations + 1);
        const md = this.createMessageDigest();
        const hashToRelated = this.createHashToRelated(id, issuer);
        const hashes = [...hashToRelated.keys()].sort();
        for (const hash of hashes) {
          md.update(hash);
          let chosenPath = "";
          let chosenIssuer;
          const permuter = new Permuter(hashToRelated.get(hash));
          while (permuter.hasNext()) {
            const permutation = permuter.next();
            let issuerCopy = issuer.clone();
            let path = "";
            const recursionList = [];
            let nextPermutation = false;
            for (const related of permutation) {
              if (this.canonicalIssuer.hasId(related)) {
                path += this.canonicalIssuer.getId(related);
              } else {
                if (!issuerCopy.hasId(related)) {
                  recursionList.push(related);
                }
                path += issuerCopy.getId(related);
              }
              if (chosenPath.length !== 0 && path > chosenPath) {
                nextPermutation = true;
                break;
              }
            }
            if (nextPermutation) {
              continue;
            }
            for (const related of recursionList) {
              const result = this.hashNDegreeQuads(related, issuerCopy);
              path += issuerCopy.getId(related);
              path += `<${result.hash}>`;
              issuerCopy = result.issuer;
              if (chosenPath.length !== 0 && path > chosenPath) {
                nextPermutation = true;
                break;
              }
            }
            if (nextPermutation) {
              continue;
            }
            if (chosenPath.length === 0 || path < chosenPath) {
              chosenPath = path;
              chosenIssuer = issuerCopy;
            }
          }
          md.update(chosenPath);
          issuer = chosenIssuer;
        }
        return { hash: md.digest(), issuer };
      }
      // helper for modifying component during Hash First Degree Quads
      modifyFirstDegreeComponent(id, component) {
        if (component.termType !== "BlankNode") {
          return component;
        }
        return {
          termType: "BlankNode",
          value: component.value === id ? "_:a" : "_:z",
        };
      }
      // helper for getting a related predicate
      getRelatedPredicate(quad) {
        return `<${quad.predicate.value}>`;
      }
      // helper for creating hash to related blank nodes map
      createHashToRelated(id, issuer) {
        const hashToRelated = /* @__PURE__ */ new Map();
        const quads = this.blankNodeInfo.get(id).quads;
        for (const quad of quads) {
          this._addRelatedBlankNodeHash({
            quad,
            component: quad.subject,
            position: "s",
            id,
            issuer,
            hashToRelated,
          });
          this._addRelatedBlankNodeHash({
            quad,
            component: quad.object,
            position: "o",
            id,
            issuer,
            hashToRelated,
          });
          this._addRelatedBlankNodeHash({
            quad,
            component: quad.graph,
            position: "g",
            id,
            issuer,
            hashToRelated,
          });
        }
        return hashToRelated;
      }
      _hashAndTrackBlankNode({ id, hashToBlankNodes }) {
        const hash = this.hashFirstDegreeQuads(id);
        const idList = hashToBlankNodes.get(hash);
        if (!idList) {
          hashToBlankNodes.set(hash, [id]);
        } else {
          idList.push(id);
        }
      }
      _addBlankNodeQuadInfo({ quad, component }) {
        if (component.termType !== "BlankNode") {
          return;
        }
        const id = component.value;
        const info = this.blankNodeInfo.get(id);
        if (info) {
          info.quads.add(quad);
        } else {
          this.blankNodeInfo.set(id, {
            quads: /* @__PURE__ */ new Set([quad]),
            hash: null,
          });
        }
      }
      _addRelatedBlankNodeHash({
        quad,
        component,
        position,
        id,
        issuer,
        hashToRelated,
      }) {
        if (!(component.termType === "BlankNode" && component.value !== id)) {
          return;
        }
        const related = component.value;
        const hash = this.hashRelatedBlankNode(related, quad, issuer, position);
        const entries = hashToRelated.get(hash);
        if (entries) {
          entries.push(related);
        } else {
          hashToRelated.set(hash, [related]);
        }
      }
      // canonical ids for 7.1
      _componentWithCanonicalId({ component }) {
        if (
          component.termType === "BlankNode" &&
          !component.value.startsWith(this.canonicalIssuer.prefix)
        ) {
          return {
            termType: "BlankNode",
            value: this.canonicalIssuer.getId(component.value),
          };
        }
        return component;
      }
    };
    function _stringHashCompare(a, b) {
      return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
    }
  },
});
var require_URGNA2012Sync = __commonJS({
  "node_modules/rdf-canonize/lib/URGNA2012Sync.js"(exports, module2) {
    "use strict";
    const MessageDigest = require_MessageDigest();
    const URDNA2015Sync = require_URDNA2015Sync();
    module2.exports = class URDNA2012Sync extends URDNA2015Sync {
      constructor() {
        super();
        this.name = "URGNA2012";
        this.createMessageDigest = () => new MessageDigest("sha1");
      }
      // helper for modifying component during Hash First Degree Quads
      modifyFirstDegreeComponent(id, component, key) {
        if (component.termType !== "BlankNode") {
          return component;
        }
        if (key === "graph") {
          return {
            termType: "BlankNode",
            value: "_:g",
          };
        }
        return {
          termType: "BlankNode",
          value: component.value === id ? "_:a" : "_:z",
        };
      }
      // helper for getting a related predicate
      getRelatedPredicate(quad) {
        return quad.predicate.value;
      }
      // helper for creating hash to related blank nodes map
      createHashToRelated(id, issuer) {
        const hashToRelated = /* @__PURE__ */ new Map();
        const quads = this.blankNodeInfo.get(id).quads;
        for (const quad of quads) {
          let position;
          let related;
          if (
            quad.subject.termType === "BlankNode" &&
            quad.subject.value !== id
          ) {
            related = quad.subject.value;
            position = "p";
          } else if (
            quad.object.termType === "BlankNode" &&
            quad.object.value !== id
          ) {
            related = quad.object.value;
            position = "r";
          } else {
            continue;
          }
          const hash = this.hashRelatedBlankNode(
            related,
            quad,
            issuer,
            position
          );
          const entries = hashToRelated.get(hash);
          if (entries) {
            entries.push(related);
          } else {
            hashToRelated.set(hash, [related]);
          }
        }
        return hashToRelated;
      }
    };
  },
});
var require_lib = __commonJS({
  "node_modules/rdf-canonize/lib/index.js"(exports) {
    "use strict";
    const URDNA2015 = require_URDNA2015();
    const URGNA2012 = require_URGNA2012();
    const URDNA2015Sync = require_URDNA2015Sync();
    const URGNA2012Sync = require_URGNA2012Sync();
    let rdfCanonizeNative;
    try {
      rdfCanonizeNative = require("rdf-canonize-native");
    } catch (e) {}
    function _inputToDataset(input) {
      if (!Array.isArray(input)) {
        return exports.NQuads.legacyDatasetToQuads(input);
      }
      return input;
    }
    exports.NQuads = require_NQuads();
    exports.IdentifierIssuer = require_IdentifierIssuer();
    exports._rdfCanonizeNative = function (api) {
      if (api) {
        rdfCanonizeNative = api;
      }
      return rdfCanonizeNative;
    };
    exports.canonize = async function (input, options) {
      const dataset = _inputToDataset(input, options);
      if (options.useNative) {
        if (!rdfCanonizeNative) {
          throw new Error("rdf-canonize-native not available");
        }
        if (options.createMessageDigest) {
          throw new Error(
            '"createMessageDigest" cannot be used with "useNative".'
          );
        }
        return new Promise((resolve, reject) =>
          rdfCanonizeNative.canonize(dataset, options, (err, canonical) =>
            err ? reject(err) : resolve(canonical)
          )
        );
      }
      if (options.algorithm === "URDNA2015") {
        return new URDNA2015(options).main(dataset);
      }
      if (options.algorithm === "URGNA2012") {
        if (options.createMessageDigest) {
          throw new Error(
            '"createMessageDigest" cannot be used with "URGNA2012".'
          );
        }
        return new URGNA2012(options).main(dataset);
      }
      if (!("algorithm" in options)) {
        throw new Error("No RDF Dataset Canonicalization algorithm specified.");
      }
      throw new Error(
        "Invalid RDF Dataset Canonicalization algorithm: " + options.algorithm
      );
    };
    exports._canonizeSync = function (input, options) {
      const dataset = _inputToDataset(input, options);
      if (options.useNative) {
        if (!rdfCanonizeNative) {
          throw new Error("rdf-canonize-native not available");
        }
        if (options.createMessageDigest) {
          throw new Error(
            '"createMessageDigest" cannot be used with "useNative".'
          );
        }
        return rdfCanonizeNative.canonizeSync(dataset, options);
      }
      if (options.algorithm === "URDNA2015") {
        return new URDNA2015Sync(options).main(dataset);
      }
      if (options.algorithm === "URGNA2012") {
        if (options.createMessageDigest) {
          throw new Error(
            '"createMessageDigest" cannot be used with "URGNA2012".'
          );
        }
        return new URGNA2012Sync(options).main(dataset);
      }
      if (!("algorithm" in options)) {
        throw new Error("No RDF Dataset Canonicalization algorithm specified.");
      }
      throw new Error(
        "Invalid RDF Dataset Canonicalization algorithm: " + options.algorithm
      );
    };
  },
});
var require_rdf_canonize = __commonJS({
  "node_modules/rdf-canonize/index.js"(exports, module2) {
    module2.exports = require_lib();
  },
});
var require_types = __commonJS({
  "node_modules/jsonld/lib/types.js"(exports, module2) {
    "use strict";
    const api = {};
    module2.exports = api;
    api.isArray = Array.isArray;
    api.isBoolean = (v) =>
      typeof v === "boolean" ||
      Object.prototype.toString.call(v) === "[object Boolean]";
    api.isDouble = (v) =>
      api.isNumber(v) && (String(v).indexOf(".") !== -1 || Math.abs(v) >= 1e21);
    api.isEmptyObject = (v) => api.isObject(v) && Object.keys(v).length === 0;
    api.isNumber = (v) =>
      typeof v === "number" ||
      Object.prototype.toString.call(v) === "[object Number]";
    api.isNumeric = (v) => !isNaN(parseFloat(v)) && isFinite(v);
    api.isObject = (v) =>
      Object.prototype.toString.call(v) === "[object Object]";
    api.isString = (v) =>
      typeof v === "string" ||
      Object.prototype.toString.call(v) === "[object String]";
    api.isUndefined = (v) => typeof v === "undefined";
  },
});
var require_graphTypes = __commonJS({
  "node_modules/jsonld/lib/graphTypes.js"(exports, module2) {
    "use strict";
    const types = require_types();
    const api = {};
    module2.exports = api;
    api.isSubject = (v) => {
      if (
        types.isObject(v) &&
        !("@value" in v || "@set" in v || "@list" in v)
      ) {
        const keyCount = Object.keys(v).length;
        return keyCount > 1 || !("@id" in v);
      }
      return false;
    };
    api.isSubjectReference = (v) =>
      // Note: A value is a subject reference if all of these hold true:
      // 1. It is an Object.
      // 2. It has a single key: @id.
      types.isObject(v) && Object.keys(v).length === 1 && "@id" in v;
    api.isValue = (v) =>
      // Note: A value is a @value if all of these hold true:
      // 1. It is an Object.
      // 2. It has the @value property.
      types.isObject(v) && "@value" in v;
    api.isList = (v) =>
      // Note: A value is a @list if all of these hold true:
      // 1. It is an Object.
      // 2. It has the @list property.
      types.isObject(v) && "@list" in v;
    api.isGraph = (v) => {
      return (
        types.isObject(v) &&
        "@graph" in v &&
        Object.keys(v).filter((key) => key !== "@id" && key !== "@index")
          .length === 1
      );
    };
    api.isSimpleGraph = (v) => {
      return api.isGraph(v) && !("@id" in v);
    };
    api.isBlankNode = (v) => {
      if (types.isObject(v)) {
        if ("@id" in v) {
          const id = v["@id"];
          return !types.isString(id) || id.indexOf("_:") === 0;
        }
        return (
          Object.keys(v).length === 0 ||
          !("@value" in v || "@set" in v || "@list" in v)
        );
      }
      return false;
    };
  },
});
var require_JsonLdError = __commonJS({
  "node_modules/jsonld/lib/JsonLdError.js"(exports, module2) {
    "use strict";
    module2.exports = class JsonLdError extends Error {
      /**
       * Creates a JSON-LD Error.
       *
       * @param msg - The error message.
       * @param type - The error type.
       * @param message
       * @param name2
       * @param details - The error details.
       */
      constructor(
        message = "An unspecified JSON-LD error occurred.",
        name2 = "jsonld.Error",
        details = {}
      ) {
        super(message);
        this.name = name2;
        this.message = message;
        this.details = details;
      }
    };
  },
});
var require_util = __commonJS({
  "node_modules/jsonld/lib/util.js"(exports, module2) {
    "use strict";
    const graphTypes = require_graphTypes();
    const types = require_types();
    const IdentifierIssuer = require_rdf_canonize().IdentifierIssuer;
    const JsonLdError = require_JsonLdError();
    const REGEX_BCP47 = /^[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*$/;
    const REGEX_LINK_HEADERS = /(?:<[^>]*?>|"[^"]*?"|[^,])+/g;
    const REGEX_LINK_HEADER = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
    const REGEX_LINK_HEADER_PARAMS =
      /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;
    const REGEX_KEYWORD = /^@[a-zA-Z]+$/;
    const DEFAULTS = {
      headers: {
        accept: "application/ld+json, application/json",
      },
    };
    const api = {};
    module2.exports = api;
    api.IdentifierIssuer = IdentifierIssuer;
    api.REGEX_BCP47 = REGEX_BCP47;
    api.REGEX_KEYWORD = REGEX_KEYWORD;
    api.clone = function (value) {
      if (value && typeof value === "object") {
        let rval;
        if (types.isArray(value)) {
          rval = [];
          for (let i = 0; i < value.length; ++i) {
            rval[i] = api.clone(value[i]);
          }
        } else if (value instanceof Map) {
          rval = /* @__PURE__ */ new Map();
          for (const [k, v] of value) {
            rval.set(k, api.clone(v));
          }
        } else if (value instanceof Set) {
          rval = /* @__PURE__ */ new Set();
          for (const v of value) {
            rval.add(api.clone(v));
          }
        } else if (types.isObject(value)) {
          rval = {};
          for (const key in value) {
            rval[key] = api.clone(value[key]);
          }
        } else {
          rval = value.toString();
        }
        return rval;
      }
      return value;
    };
    api.asArray = function (value) {
      return Array.isArray(value) ? value : [value];
    };
    api.buildHeaders = (headers = {}) => {
      const hasAccept = Object.keys(headers).some(
        (h) => h.toLowerCase() === "accept"
      );
      if (hasAccept) {
        throw new RangeError(
          'Accept header may not be specified; only "' +
            DEFAULTS.headers.accept +
            '" is supported.'
        );
      }
      return Object.assign({ Accept: DEFAULTS.headers.accept }, headers);
    };
    api.parseLinkHeader = (header) => {
      const rval = {};
      const entries = header.match(REGEX_LINK_HEADERS);
      for (let i = 0; i < entries.length; ++i) {
        let match = entries[i].match(REGEX_LINK_HEADER);
        if (!match) {
          continue;
        }
        const result = { target: match[1] };
        const params = match[2];
        while ((match = REGEX_LINK_HEADER_PARAMS.exec(params))) {
          result[match[1]] = match[2] === void 0 ? match[3] : match[2];
        }
        const rel = result.rel || "";
        if (Array.isArray(rval[rel])) {
          rval[rel].push(result);
        } else if (rval.hasOwnProperty(rel)) {
          rval[rel] = [rval[rel], result];
        } else {
          rval[rel] = result;
        }
      }
      return rval;
    };
    api.validateTypeValue = (v, isFrame) => {
      if (types.isString(v)) {
        return;
      }
      if (types.isArray(v) && v.every((vv) => types.isString(vv))) {
        return;
      }
      if (isFrame && types.isObject(v)) {
        switch (Object.keys(v).length) {
          case 0:
            return;
          case 1:
            if (
              "@default" in v &&
              api.asArray(v["@default"]).every((vv) => types.isString(vv))
            ) {
              return;
            }
        }
      }
      throw new JsonLdError(
        'Invalid JSON-LD syntax; "@type" value must a string, an array of strings, an empty object, or a default object.',
        "jsonld.SyntaxError",
        { code: "invalid type value", value: v }
      );
    };
    api.hasProperty = (subject, property) => {
      if (subject.hasOwnProperty(property)) {
        const value = subject[property];
        return !types.isArray(value) || value.length > 0;
      }
      return false;
    };
    api.hasValue = (subject, property, value) => {
      if (api.hasProperty(subject, property)) {
        let val = subject[property];
        const isList = graphTypes.isList(val);
        if (types.isArray(val) || isList) {
          if (isList) {
            val = val["@list"];
          }
          for (let i = 0; i < val.length; ++i) {
            if (api.compareValues(value, val[i])) {
              return true;
            }
          }
        } else if (!types.isArray(value)) {
          return api.compareValues(value, val);
        }
      }
      return false;
    };
    api.addValue = (subject, property, value, options) => {
      options = options || {};
      if (!("propertyIsArray" in options)) {
        options.propertyIsArray = false;
      }
      if (!("valueIsArray" in options)) {
        options.valueIsArray = false;
      }
      if (!("allowDuplicate" in options)) {
        options.allowDuplicate = true;
      }
      if (!("prependValue" in options)) {
        options.prependValue = false;
      }
      if (options.valueIsArray) {
        subject[property] = value;
      } else if (types.isArray(value)) {
        if (
          value.length === 0 &&
          options.propertyIsArray &&
          !subject.hasOwnProperty(property)
        ) {
          subject[property] = [];
        }
        if (options.prependValue) {
          value = value.concat(subject[property]);
          subject[property] = [];
        }
        for (let i = 0; i < value.length; ++i) {
          api.addValue(subject, property, value[i], options);
        }
      } else if (subject.hasOwnProperty(property)) {
        const hasValue =
          !options.allowDuplicate && api.hasValue(subject, property, value);
        if (
          !types.isArray(subject[property]) &&
          (!hasValue || options.propertyIsArray)
        ) {
          subject[property] = [subject[property]];
        }
        if (!hasValue) {
          if (options.prependValue) {
            subject[property].unshift(value);
          } else {
            subject[property].push(value);
          }
        }
      } else {
        subject[property] = options.propertyIsArray ? [value] : value;
      }
    };
    api.getValues = (subject, property) => [].concat(subject[property] || []);
    api.removeProperty = (subject, property) => {
      delete subject[property];
    };
    api.removeValue = (subject, property, value, options) => {
      options = options || {};
      if (!("propertyIsArray" in options)) {
        options.propertyIsArray = false;
      }
      const values = api
        .getValues(subject, property)
        .filter((e) => !api.compareValues(e, value));
      if (values.length === 0) {
        api.removeProperty(subject, property);
      } else if (values.length === 1 && !options.propertyIsArray) {
        subject[property] = values[0];
      } else {
        subject[property] = values;
      }
    };
    api.relabelBlankNodes = (input, options) => {
      options = options || {};
      const issuer = options.issuer || new IdentifierIssuer("_:b");
      return _labelBlankNodes(issuer, input);
    };
    api.compareValues = (v1, v2) => {
      if (v1 === v2) {
        return true;
      }
      if (
        graphTypes.isValue(v1) &&
        graphTypes.isValue(v2) &&
        v1["@value"] === v2["@value"] &&
        v1["@type"] === v2["@type"] &&
        v1["@language"] === v2["@language"] &&
        v1["@index"] === v2["@index"]
      ) {
        return true;
      }
      if (
        types.isObject(v1) &&
        "@id" in v1 &&
        types.isObject(v2) &&
        "@id" in v2
      ) {
        return v1["@id"] === v2["@id"];
      }
      return false;
    };
    api.compareShortestLeast = (a, b) => {
      if (a.length < b.length) {
        return -1;
      }
      if (b.length < a.length) {
        return 1;
      }
      if (a === b) {
        return 0;
      }
      return a < b ? -1 : 1;
    };
    function _labelBlankNodes(issuer, element) {
      if (types.isArray(element)) {
        for (let i = 0; i < element.length; ++i) {
          element[i] = _labelBlankNodes(issuer, element[i]);
        }
      } else if (graphTypes.isList(element)) {
        element["@list"] = _labelBlankNodes(issuer, element["@list"]);
      } else if (types.isObject(element)) {
        if (graphTypes.isBlankNode(element)) {
          element["@id"] = issuer.getId(element["@id"]);
        }
        const keys = Object.keys(element).sort();
        for (let ki = 0; ki < keys.length; ++ki) {
          const key = keys[ki];
          if (key !== "@id") {
            element[key] = _labelBlankNodes(issuer, element[key]);
          }
        }
      }
      return element;
    }
  },
});
var require_constants = __commonJS({
  "node_modules/jsonld/lib/constants.js"(exports, module2) {
    "use strict";
    const RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
    const XSD = "http://www.w3.org/2001/XMLSchema#";
    module2.exports = {
      // TODO: Deprecated and will be removed later. Use LINK_HEADER_CONTEXT.
      LINK_HEADER_REL: "http://www.w3.org/ns/json-ld#context",
      LINK_HEADER_CONTEXT: "http://www.w3.org/ns/json-ld#context",
      RDF,
      RDF_LIST: RDF + "List",
      RDF_FIRST: RDF + "first",
      RDF_REST: RDF + "rest",
      RDF_NIL: RDF + "nil",
      RDF_TYPE: RDF + "type",
      RDF_PLAIN_LITERAL: RDF + "PlainLiteral",
      RDF_XML_LITERAL: RDF + "XMLLiteral",
      RDF_JSON_LITERAL: RDF + "JSON",
      RDF_OBJECT: RDF + "object",
      RDF_LANGSTRING: RDF + "langString",
      XSD,
      XSD_BOOLEAN: XSD + "boolean",
      XSD_DOUBLE: XSD + "double",
      XSD_INTEGER: XSD + "integer",
      XSD_STRING: XSD + "string",
    };
  },
});
var require_RequestQueue = __commonJS({
  "node_modules/jsonld/lib/RequestQueue.js"(exports, module2) {
    "use strict";
    module2.exports = class RequestQueue {
      /**
       * Creates a simple queue for requesting documents.
       */
      constructor() {
        this._requests = {};
      }
      wrapLoader(loader) {
        const self = this;
        self._loader = loader;
        return function () {
          return self.add.apply(self, arguments);
        };
      }
      async add(url) {
        let promise = this._requests[url];
        if (promise) {
          return Promise.resolve(promise);
        }
        promise = this._requests[url] = this._loader(url);
        try {
          return await promise;
        } finally {
          delete this._requests[url];
        }
      }
    };
  },
});
var require_url = __commonJS({
  "node_modules/jsonld/lib/url.js"(exports, module2) {
    "use strict";
    const types = require_types();
    const api = {};
    module2.exports = api;
    api.parsers = {
      simple: {
        // RFC 3986 basic parts
        keys: ["href", "scheme", "authority", "path", "query", "fragment"],
        /* eslint-disable-next-line max-len */
        regex:
          /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
      },
      full: {
        keys: [
          "href",
          "protocol",
          "scheme",
          "authority",
          "auth",
          "user",
          "password",
          "hostname",
          "port",
          "path",
          "directory",
          "file",
          "query",
          "fragment",
        ],
        /* eslint-disable-next-line max-len */
        regex:
          /^(([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?(?:(((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      },
    };
    api.parse = (str, parser) => {
      const parsed = {};
      const o = api.parsers[parser || "full"];
      const m = o.regex.exec(str);
      let i = o.keys.length;
      while (i--) {
        parsed[o.keys[i]] = m[i] === void 0 ? null : m[i];
      }
      if (
        (parsed.scheme === "https" && parsed.port === "443") ||
        (parsed.scheme === "http" && parsed.port === "80")
      ) {
        parsed.href = parsed.href.replace(":" + parsed.port, "");
        parsed.authority = parsed.authority.replace(":" + parsed.port, "");
        parsed.port = null;
      }
      parsed.normalizedPath = api.removeDotSegments(parsed.path);
      return parsed;
    };
    api.prependBase = (base, iri) => {
      if (base === null) {
        return iri;
      }
      if (api.isAbsolute(iri)) {
        return iri;
      }
      if (!base || types.isString(base)) {
        base = api.parse(base || "");
      }
      const rel = api.parse(iri);
      const transform = {
        protocol: base.protocol || "",
      };
      if (rel.authority !== null) {
        transform.authority = rel.authority;
        transform.path = rel.path;
        transform.query = rel.query;
      } else {
        transform.authority = base.authority;
        if (rel.path === "") {
          transform.path = base.path;
          if (rel.query !== null) {
            transform.query = rel.query;
          } else {
            transform.query = base.query;
          }
        } else {
          if (rel.path.indexOf("/") === 0) {
            transform.path = rel.path;
          } else {
            let path = base.path;
            path = path.substr(0, path.lastIndexOf("/") + 1);
            if (
              (path.length > 0 || base.authority) &&
              path.substr(-1) !== "/"
            ) {
              path += "/";
            }
            path += rel.path;
            transform.path = path;
          }
          transform.query = rel.query;
        }
      }
      if (rel.path !== "") {
        transform.path = api.removeDotSegments(transform.path);
      }
      let rval = transform.protocol;
      if (transform.authority !== null) {
        rval += "//" + transform.authority;
      }
      rval += transform.path;
      if (transform.query !== null) {
        rval += "?" + transform.query;
      }
      if (rel.fragment !== null) {
        rval += "#" + rel.fragment;
      }
      if (rval === "") {
        rval = "./";
      }
      return rval;
    };
    api.removeBase = (base, iri) => {
      if (base === null) {
        return iri;
      }
      if (!base || types.isString(base)) {
        base = api.parse(base || "");
      }
      let root = "";
      if (base.href !== "") {
        root += (base.protocol || "") + "//" + (base.authority || "");
      } else if (iri.indexOf("//")) {
        root += "//";
      }
      if (iri.indexOf(root) !== 0) {
        return iri;
      }
      const rel = api.parse(iri.substr(root.length));
      const baseSegments = base.normalizedPath.split("/");
      const iriSegments = rel.normalizedPath.split("/");
      const last = rel.fragment || rel.query ? 0 : 1;
      while (baseSegments.length > 0 && iriSegments.length > last) {
        if (baseSegments[0] !== iriSegments[0]) {
          break;
        }
        baseSegments.shift();
        iriSegments.shift();
      }
      let rval = "";
      if (baseSegments.length > 0) {
        baseSegments.pop();
        for (let i = 0; i < baseSegments.length; ++i) {
          rval += "../";
        }
      }
      rval += iriSegments.join("/");
      if (rel.query !== null) {
        rval += "?" + rel.query;
      }
      if (rel.fragment !== null) {
        rval += "#" + rel.fragment;
      }
      if (rval === "") {
        rval = "./";
      }
      return rval;
    };
    api.removeDotSegments = (path) => {
      if (path.length === 0) {
        return "";
      }
      const input = path.split("/");
      const output = [];
      while (input.length > 0) {
        const next = input.shift();
        const done = input.length === 0;
        if (next === ".") {
          if (done) {
            output.push("");
          }
          continue;
        }
        if (next === "..") {
          output.pop();
          if (done) {
            output.push("");
          }
          continue;
        }
        output.push(next);
      }
      if (path[0] === "/" && output.length > 0 && output[0] !== "") {
        output.unshift("");
      }
      if (output.length === 1 && output[0] === "") {
        return "/";
      }
      return output.join("/");
    };
    const isAbsoluteRegex = /^([A-Za-z][A-Za-z0-9+-.]*|_):[^\s]*$/;
    api.isAbsolute = (v) => types.isString(v) && isAbsoluteRegex.test(v);
    api.isRelative = (v) => types.isString(v);
  },
});
var require_cjs = __commonJS({
  "node_modules/@digitalbazaar/http-client/dist/cjs/index.cjs"(exports) {
    "use strict";
    function deferred(f) {
      let promise;
      return {
        then(onfulfilled, onrejected) {
          promise || (promise = new Promise((resolve) => resolve(f())));
          return promise.then(onfulfilled, onrejected);
        },
      };
    }
    const kyOriginalPromise = deferred(() => {
      throw new Error("HttpClient not supported");
    });
    const DEFAULT_HEADERS = {
      Accept: "application/ld+json, application/json",
    };
    const httpClient = void 0;
    exports.DEFAULT_HEADERS = DEFAULT_HEADERS;
    exports.httpClient = httpClient;
    exports.kyPromise = kyOriginalPromise;
  },
});
var require_node = __commonJS({
  "node_modules/jsonld/lib/documentLoaders/node.js"(exports, module2) {
    "use strict";
    // const https = import("https://deno.land/x/http@v0.1.1-alpha/mod.ts");
    //const https = require("node:https");
    const { parseLinkHeader, buildHeaders } = require_util();
    const { LINK_HEADER_CONTEXT } = require_constants();
    const JsonLdError = require_JsonLdError();
    const RequestQueue = require_RequestQueue();
    const { prependBase } = require_url();
    const { httpClient } = require_cjs();
    module2.exports = (
      {
        secure,
        strictSSL = true,
        maxRedirects = -1,
        headers = {},
        httpAgent,
        httpsAgent,
      } = { strictSSL: true, maxRedirects: -1, headers: {} }
    ) => {
      headers = buildHeaders(headers);
      if (!("user-agent" in headers)) {
        headers = Object.assign({}, headers, {
          "user-agent": "jsonld.js",
        });
      }
      // const http = require("node:http");
      // const http = import("https://deno.land/x/http@v0.1.1-alpha/mod.ts");
      const queue = new RequestQueue();
      return queue.wrapLoader(function (url) {
        return loadDocument(url, []);
      });
      async function loadDocument(url, redirects) {
        const isHttp = url.startsWith("http:");
        const isHttps = url.startsWith("https:");
        if (!isHttp && !isHttps) {
          throw new JsonLdError(
            'URL could not be dereferenced; only "http" and "https" URLs are supported.',
            "jsonld.InvalidUrl",
            { code: "loading document failed", url }
          );
        }
        if (secure && !isHttps) {
          throw new JsonLdError(
            `URL could not be dereferenced; secure mode is enabled and the URL's scheme is not "https".`,
            "jsonld.InvalidUrl",
            { code: "loading document failed", url }
          );
        }
        let doc = null;
        if (doc !== null) {
          return doc;
        }
        let alternate = null;
        const { res, body } = await _fetch({
          url,
          headers,
          strictSSL,
          httpAgent,
          httpsAgent,
        });
        doc = { contextUrl: null, documentUrl: url, document: body || null };
        const statusText = http.STATUS_CODES[res.status];
        if (res.status >= 400) {
          throw new JsonLdError(
            `URL "${url}" could not be dereferenced: ${statusText}`,
            "jsonld.InvalidUrl",
            {
              code: "loading document failed",
              url,
              httpStatusCode: res.status,
            }
          );
        }
        const link = res.headers.get("link");
        let location = res.headers.get("location");
        const contentType = res.headers.get("content-type");
        if (link && contentType !== "application/ld+json") {
          const linkHeaders = parseLinkHeader(link);
          const linkedContext = linkHeaders[LINK_HEADER_CONTEXT];
          if (Array.isArray(linkedContext)) {
            throw new JsonLdError(
              "URL could not be dereferenced, it has more than one associated HTTP Link Header.",
              "jsonld.InvalidUrl",
              { code: "multiple context link headers", url }
            );
          }
          if (linkedContext) {
            doc.contextUrl = linkedContext.target;
          }
          alternate = linkHeaders.alternate;
          if (
            alternate &&
            alternate.type == "application/ld+json" &&
            !(contentType || "").match(/^application\/(\w*\+)?json$/)
          ) {
            location = prependBase(url, alternate.target);
          }
        }
        if (
          (alternate || (res.status >= 300 && res.status < 400)) &&
          location
        ) {
          if (redirects.length === maxRedirects) {
            throw new JsonLdError(
              "URL could not be dereferenced; there were too many redirects.",
              "jsonld.TooManyRedirects",
              {
                code: "loading document failed",
                url,
                httpStatusCode: res.status,
                redirects,
              }
            );
          }
          if (redirects.indexOf(url) !== -1) {
            throw new JsonLdError(
              "URL could not be dereferenced; infinite redirection was detected.",
              "jsonld.InfiniteRedirectDetected",
              {
                code: "recursive context inclusion",
                url,
                httpStatusCode: res.status,
                redirects,
              }
            );
          }
          redirects.push(url);
          const nextUrl = new URL(location, url).href;
          return loadDocument(nextUrl, redirects);
        }
        redirects.push(url);
        return doc;
      }
    };
    async function _fetch({ url, headers, strictSSL, httpAgent, httpsAgent }) {
      try {
        const options = {
          headers,
          redirect: "manual",
          // ky specific to avoid redirects throwing
          throwHttpErrors: false,
        };
        const isHttps = url.startsWith("https:");
        if (isHttps) {
          options.agent =
            httpsAgent || new https.Agent({ rejectUnauthorized: strictSSL });
        } else {
          if (httpAgent) {
            options.agent = httpAgent;
          }
        }
        const res = await httpClient.get(url, options);
        return { res, body: res.data };
      } catch (e) {
        if (e.response) {
          return { res: e.response, body: null };
        }
        throw new JsonLdError(
          "URL could not be dereferenced, an error occurred.",
          "jsonld.LoadDocumentError",
          { code: "loading document failed", url, cause: e }
        );
      }
    }
  },
});
var require_platform = __commonJS({
  "node_modules/jsonld/lib/platform.js"(exports, module2) {
    "use strict";
    const nodeLoader = require_node();
    const api = {};
    module2.exports = api;
    api.setupDocumentLoaders = function (jsonld5) {
      jsonld5.documentLoaders.node = nodeLoader;
      jsonld5.useDocumentLoader("node");
    };
    api.setupGlobals = function (jsonld5) {};
  },
});
var require_iterator = __commonJS({
  "node_modules/yallist/iterator.js"(exports, module2) {
    "use strict";
    module2.exports = function (Yallist) {
      Yallist.prototype[Symbol.iterator] = function* () {
        for (let walker = this.head; walker; walker = walker.next) {
          yield walker.value;
        }
      };
    };
  },
});
var require_yallist = __commonJS({
  "node_modules/yallist/yallist.js"(exports, module2) {
    "use strict";
    module2.exports = Yallist;
    Yallist.Node = Node;
    Yallist.create = Yallist;
    function Yallist(list) {
      let self = this;
      if (!(self instanceof Yallist)) {
        self = new Yallist();
      }
      self.tail = null;
      self.head = null;
      self.length = 0;
      if (list && typeof list.forEach === "function") {
        list.forEach(function (item) {
          self.push(item);
        });
      } else if (arguments.length > 0) {
        for (let i = 0, l = arguments.length; i < l; i++) {
          self.push(arguments[i]);
        }
      }
      return self;
    }
    Yallist.prototype.removeNode = function (node) {
      if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
      }
      const next = node.next;
      const prev = node.prev;
      if (next) {
        next.prev = prev;
      }
      if (prev) {
        prev.next = next;
      }
      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }
      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };
    Yallist.prototype.unshiftNode = function (node) {
      if (node === this.head) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      const head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };
    Yallist.prototype.pushNode = function (node) {
      if (node === this.tail) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      const tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }
      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };
    Yallist.prototype.push = function () {
      for (let i = 0, l = arguments.length; i < l; i++) {
        push(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.unshift = function () {
      for (let i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.pop = function () {
      if (!this.tail) {
        return void 0;
      }
      const res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.shift = function () {
      if (!this.head) {
        return void 0;
      }
      const res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.forEach = function (fn, thisp) {
      thisp = thisp || this;
      for (let walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };
    Yallist.prototype.forEachReverse = function (fn, thisp) {
      thisp = thisp || this;
      for (let walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };
    Yallist.prototype.get = function (n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        walker = walker.next;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.getReverse = function (n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        walker = walker.prev;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.map = function (fn, thisp) {
      thisp = thisp || this;
      const res = new Yallist();
      for (let walker = this.head; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res;
    };
    Yallist.prototype.mapReverse = function (fn, thisp) {
      thisp = thisp || this;
      const res = new Yallist();
      for (let walker = this.tail; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res;
    };
    Yallist.prototype.reduce = function (fn, initial) {
      let acc;
      let walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (let i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }
      return acc;
    };
    Yallist.prototype.reduceReverse = function (fn, initial) {
      let acc;
      let walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (let i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }
      return acc;
    };
    Yallist.prototype.toArray = function () {
      const arr = new Array(this.length);
      for (let i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }
      return arr;
    };
    Yallist.prototype.toArrayReverse = function () {
      const arr = new Array(this.length);
      for (let i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }
      return arr;
    };
    Yallist.prototype.slice = function (from2, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from2 = from2 || 0;
      if (from2 < 0) {
        from2 += this.length;
      }
      const ret = new Yallist();
      if (to < from2 || to < 0) {
        return ret;
      }
      if (from2 < 0) {
        from2 = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = 0, walker = this.head; walker !== null && i < from2; i++) {
        walker = walker.next;
      }
      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.sliceReverse = function (from2, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from2 = from2 || 0;
      if (from2 < 0) {
        from2 += this.length;
      }
      const ret = new Yallist();
      if (to < from2 || to < 0) {
        return ret;
      }
      if (from2 < 0) {
        from2 = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (
        var i = this.length, walker = this.tail;
        walker !== null && i > to;
        i--
      ) {
        walker = walker.prev;
      }
      for (; walker !== null && i > from2; i--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }
      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }
      const ret = [];
      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }
      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }
      for (var i = 0; i < nodes.length; i++) {
        walker = insert(this, walker, nodes[i]);
      }
      return ret;
    };
    Yallist.prototype.reverse = function () {
      const head = this.head;
      const tail = this.tail;
      for (let walker = head; walker !== null; walker = walker.prev) {
        const p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this;
    };
    function insert(self, node, value) {
      const inserted =
        node === self.head
          ? new Node(value, null, node, self)
          : new Node(value, node, node.next, self);
      if (inserted.next === null) {
        self.tail = inserted;
      }
      if (inserted.prev === null) {
        self.head = inserted;
      }
      self.length++;
      return inserted;
    }
    function push(self, item) {
      self.tail = new Node(item, self.tail, null, self);
      if (!self.head) {
        self.head = self.tail;
      }
      self.length++;
    }
    function unshift(self, item) {
      self.head = new Node(item, null, self.head, self);
      if (!self.tail) {
        self.tail = self.head;
      }
      self.length++;
    }
    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }
      this.list = list;
      this.value = value;
      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }
      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }
    try {
      require_iterator()(Yallist);
    } catch (er) {}
  },
});
var require_lru_cache = __commonJS({
  "node_modules/lru-cache/index.js"(exports, module2) {
    "use strict";
    const Yallist = require_yallist();
    const MAX = Symbol("max");
    const LENGTH = Symbol("length");
    const LENGTH_CALCULATOR = Symbol("lengthCalculator");
    const ALLOW_STALE = Symbol("allowStale");
    const MAX_AGE = Symbol("maxAge");
    const DISPOSE = Symbol("dispose");
    const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
    const LRU_LIST = Symbol("lruList");
    const CACHE = Symbol("cache");
    const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
    const naiveLength = () => 1;
    const LRUCache = class {
      constructor(options) {
        if (typeof options === "number") {
          options = { max: options };
        }
        if (!options) {
          options = {};
        }
        if (
          options.max &&
          (typeof options.max !== "number" || options.max < 0)
        ) {
          throw new TypeError("max must be a non-negative number");
        }
        const max = (this[MAX] = options.max || Infinity);
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number") {
          throw new TypeError("maxAge must be a number");
        }
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      }
      // resize the cache when the max changes.
      set max(mL) {
        if (typeof mL !== "number" || mL < 0) {
          throw new TypeError("max must be a non-negative number");
        }
        this[MAX] = mL || Infinity;
        trim(this);
      }
      get max() {
        return this[MAX];
      }
      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }
      get allowStale() {
        return this[ALLOW_STALE];
      }
      set maxAge(mA) {
        if (typeof mA !== "number") {
          throw new TypeError("maxAge must be a non-negative number");
        }
        this[MAX_AGE] = mA;
        trim(this);
      }
      get maxAge() {
        return this[MAX_AGE];
      }
      // resize the cache when the lengthCalculator changes.
      set lengthCalculator(lC) {
        if (typeof lC !== "function") {
          lC = naiveLength;
        }
        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach((hit) => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }
        trim(this);
      }
      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }
      get length() {
        return this[LENGTH];
      }
      get itemCount() {
        return this[LRU_LIST].length;
      }
      rforEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].tail; walker !== null; ) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }
      forEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].head; walker !== null; ) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }
      keys() {
        return this[LRU_LIST].toArray().map((k) => k.key);
      }
      values() {
        return this[LRU_LIST].toArray().map((k) => k.value);
      }
      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
        }
        this[CACHE] = /* @__PURE__ */ new Map();
        this[LRU_LIST] = new Yallist();
        this[LENGTH] = 0;
      }
      dump() {
        return this[LRU_LIST].map((hit) =>
          isStale(this, hit)
            ? false
            : {
                k: hit.key,
                v: hit.value,
                e: hit.now + (hit.maxAge || 0),
              }
        )
          .toArray()
          .filter((h) => h);
      }
      dumpLru() {
        return this[LRU_LIST];
      }
      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== "number") {
          throw new TypeError("maxAge must be a number");
        }
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }
          const node = this[CACHE].get(key);
          const item = node.value;
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET]) {
              this[DISPOSE](key, item.value);
            }
          }
          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }
        const hit = new Entry(key, value, len, now, maxAge);
        if (hit.length > this[MAX]) {
          if (this[DISPOSE]) {
            this[DISPOSE](key, value);
          }
          return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }
      has(key) {
        if (!this[CACHE].has(key)) {
          return false;
        }
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }
      get(key) {
        return get(this, key, true);
      }
      peek(key) {
        return get(this, key, false);
      }
      pop() {
        const node = this[LRU_LIST].tail;
        if (!node) {
          return null;
        }
        del(this, node);
        return node.value;
      }
      del(key) {
        del(this, this[CACHE].get(key));
      }
      load(arr) {
        this.reset();
        const now = Date.now();
        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0) {
            this.set(hit.k, hit.v);
          } else {
            const maxAge = expiresAt - now;
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }
      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }
    };
    var get = (self, key, doUse) => {
      const node = self[CACHE].get(key);
      if (node) {
        const hit = node.value;
        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE]) {
            return void 0;
          }
        } else {
          if (doUse) {
            if (self[UPDATE_AGE_ON_GET]) {
              node.value.now = Date.now();
            }
            self[LRU_LIST].unshiftNode(node);
          }
        }
        return hit.value;
      }
    };
    var isStale = (self, hit) => {
      if (!hit || (!hit.maxAge && !self[MAX_AGE])) {
        return false;
      }
      const diff = Date.now() - hit.now;
      return hit.maxAge
        ? diff > hit.maxAge
        : self[MAX_AGE] && diff > self[MAX_AGE];
    };
    var trim = (self) => {
      if (self[LENGTH] > self[MAX]) {
        for (
          let walker = self[LRU_LIST].tail;
          self[LENGTH] > self[MAX] && walker !== null;

        ) {
          const prev = walker.prev;
          del(self, walker);
          walker = prev;
        }
      }
    };
    var del = (self, node) => {
      if (node) {
        const hit = node.value;
        if (self[DISPOSE]) {
          self[DISPOSE](hit.key, hit.value);
        }
        self[LENGTH] -= hit.length;
        self[CACHE].delete(hit.key);
        self[LRU_LIST].removeNode(node);
      }
    };
    var Entry = class {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    };
    var forEachStep = (self, fn, node, thisp) => {
      let hit = node.value;
      if (isStale(self, hit)) {
        del(self, node);
        if (!self[ALLOW_STALE]) {
          hit = void 0;
        }
      }
      if (hit) {
        fn.call(thisp, hit.value, hit.key, self);
      }
    };
    module2.exports = LRUCache;
  },
});
var require_ResolvedContext = __commonJS({
  "node_modules/jsonld/lib/ResolvedContext.js"(exports, module2) {
    "use strict";
    const LRU = require_lru_cache();
    const MAX_ACTIVE_CONTEXTS = 10;
    module2.exports = class ResolvedContext {
      /**
       * Creates a ResolvedContext.
       *
       * @param document.document
       * @param document - The context document.
       */
      constructor({ document }) {
        this.document = document;
        this.cache = new LRU({ max: MAX_ACTIVE_CONTEXTS });
      }
      getProcessed(activeCtx) {
        return this.cache.get(activeCtx);
      }
      setProcessed(activeCtx, processedCtx) {
        this.cache.set(activeCtx, processedCtx);
      }
    };
  },
});
var require_ContextResolver = __commonJS({
  "node_modules/jsonld/lib/ContextResolver.js"(exports, module2) {
    "use strict";
    const {
      isArray: _isArray,
      isObject: _isObject,
      isString: _isString,
    } = require_types();
    const { asArray: _asArray } = require_util();
    const { prependBase } = require_url();
    const JsonLdError = require_JsonLdError();
    const ResolvedContext = require_ResolvedContext();
    const MAX_CONTEXT_URLS = 10;
    module2.exports = class ContextResolver {
      /**
       * Creates a ContextResolver.
       *
       * @param sharedCache.sharedCache
       * @param sharedCache - A shared LRU cache with `get` and `set` APIs.
       */
      constructor({ sharedCache }) {
        this.perOpCache = /* @__PURE__ */ new Map();
        this.sharedCache = sharedCache;
      }
      async resolve({
        activeCtx,
        context,
        documentLoader,
        base,
        cycles = /* @__PURE__ */ new Set(),
      }) {
        if (context && _isObject(context) && context["@context"]) {
          context = context["@context"];
        }
        context = _asArray(context);
        const allResolved = [];
        for (const ctx of context) {
          if (_isString(ctx)) {
            let resolved2 = this._get(ctx);
            if (!resolved2) {
              resolved2 = await this._resolveRemoteContext({
                activeCtx,
                url: ctx,
                documentLoader,
                base,
                cycles,
              });
            }
            if (_isArray(resolved2)) {
              allResolved.push(...resolved2);
            } else {
              allResolved.push(resolved2);
            }
            continue;
          }
          if (ctx === null) {
            allResolved.push(new ResolvedContext({ document: null }));
            continue;
          }
          if (!_isObject(ctx)) {
            _throwInvalidLocalContext(context);
          }
          const key = JSON.stringify(ctx);
          let resolved = this._get(key);
          if (!resolved) {
            resolved = new ResolvedContext({ document: ctx });
            this._cacheResolvedContext({ key, resolved, tag: "static" });
          }
          allResolved.push(resolved);
        }
        return allResolved;
      }
      _get(key) {
        let resolved = this.perOpCache.get(key);
        if (!resolved) {
          const tagMap = this.sharedCache.get(key);
          if (tagMap) {
            resolved = tagMap.get("static");
            if (resolved) {
              this.perOpCache.set(key, resolved);
            }
          }
        }
        return resolved;
      }
      _cacheResolvedContext({ key, resolved, tag }) {
        this.perOpCache.set(key, resolved);
        if (tag !== void 0) {
          let tagMap = this.sharedCache.get(key);
          if (!tagMap) {
            tagMap = /* @__PURE__ */ new Map();
            this.sharedCache.set(key, tagMap);
          }
          tagMap.set(tag, resolved);
        }
        return resolved;
      }
      async _resolveRemoteContext({
        activeCtx,
        url,
        documentLoader,
        base,
        cycles,
      }) {
        url = prependBase(base, url);
        const { context, remoteDoc } = await this._fetchContext({
          activeCtx,
          url,
          documentLoader,
          cycles,
        });
        base = remoteDoc.documentUrl || url;
        _resolveContextUrls({ context, base });
        const resolved = await this.resolve({
          activeCtx,
          context,
          documentLoader,
          base,
          cycles,
        });
        this._cacheResolvedContext({ key: url, resolved, tag: remoteDoc.tag });
        return resolved;
      }
      async _fetchContext({ activeCtx, url, documentLoader, cycles }) {
        if (cycles.size > MAX_CONTEXT_URLS) {
          throw new JsonLdError(
            "Maximum number of @context URLs exceeded.",
            "jsonld.ContextUrlError",
            {
              code:
                activeCtx.processingMode === "json-ld-1.0"
                  ? "loading remote context failed"
                  : "context overflow",
              max: MAX_CONTEXT_URLS,
            }
          );
        }
        if (cycles.has(url)) {
          throw new JsonLdError(
            "Cyclical @context URLs detected.",
            "jsonld.ContextUrlError",
            {
              code:
                activeCtx.processingMode === "json-ld-1.0"
                  ? "recursive context inclusion"
                  : "context overflow",
              url,
            }
          );
        }
        cycles.add(url);
        let context;
        let remoteDoc;
        try {
          remoteDoc = await documentLoader(url);
          context = remoteDoc.document || null;
          if (_isString(context)) {
            context = JSON.parse(context);
          }
        } catch (e) {
          throw new JsonLdError(
            "Dereferencing a URL did not result in a valid JSON-LD object. Possible causes are an inaccessible URL perhaps due to a same-origin policy (ensure the server uses CORS if you are using client-side JavaScript), too many redirects, a non-JSON response, or more than one HTTP Link Header was provided for a remote context.",
            "jsonld.InvalidUrl",
            { code: "loading remote context failed", url, cause: e }
          );
        }
        if (!_isObject(context)) {
          throw new JsonLdError(
            "Dereferencing a URL did not result in a JSON object. The response was valid JSON, but it was not a JSON object.",
            "jsonld.InvalidUrl",
            { code: "invalid remote context", url }
          );
        }
        if (!("@context" in context)) {
          context = { "@context": {} };
        } else {
          context = { "@context": context["@context"] };
        }
        if (remoteDoc.contextUrl) {
          if (!_isArray(context["@context"])) {
            context["@context"] = [context["@context"]];
          }
          context["@context"].push(remoteDoc.contextUrl);
        }
        return { context, remoteDoc };
      }
    };
    function _throwInvalidLocalContext(ctx) {
      throw new JsonLdError(
        "Invalid JSON-LD syntax; @context must be an object.",
        "jsonld.SyntaxError",
        {
          code: "invalid local context",
          context: ctx,
        }
      );
    }
    function _resolveContextUrls({ context, base }) {
      if (!context) {
        return;
      }
      const ctx = context["@context"];
      if (_isString(ctx)) {
        context["@context"] = prependBase(base, ctx);
        return;
      }
      if (_isArray(ctx)) {
        for (let i = 0; i < ctx.length; ++i) {
          const element = ctx[i];
          if (_isString(element)) {
            ctx[i] = prependBase(base, element);
            continue;
          }
          if (_isObject(element)) {
            _resolveContextUrls({ context: { "@context": element }, base });
          }
        }
        return;
      }
      if (!_isObject(ctx)) {
        return;
      }
      for (const term in ctx) {
        _resolveContextUrls({ context: ctx[term], base });
      }
    }
  },
});
var require_NQuads2 = __commonJS({
  "node_modules/jsonld/lib/NQuads.js"(exports, module2) {
    "use strict";
    module2.exports = require_rdf_canonize().NQuads;
  },
});
var require_events = __commonJS({
  "node_modules/jsonld/lib/events.js"(exports, module2) {
    "use strict";
    const JsonLdError = require_JsonLdError();
    const { isArray: _isArray } = require_types();
    const { asArray: _asArray } = require_util();
    const api = {};
    module2.exports = api;
    api.defaultEventHandler = null;
    api.setupEventHandler = ({ options = {} }) => {
      const eventHandler = [].concat(
        options.safe ? api.safeEventHandler : [],
        options.eventHandler ? _asArray(options.eventHandler) : [],
        api.defaultEventHandler ? api.defaultEventHandler : []
      );
      return eventHandler.length === 0 ? null : eventHandler;
    };
    api.handleEvent = ({ event, options }) => {
      _handle({ event, handlers: options.eventHandler });
    };
    function _handle({ event, handlers }) {
      let doNext = true;
      for (let i = 0; doNext && i < handlers.length; ++i) {
        doNext = false;
        const handler = handlers[i];
        if (_isArray(handler)) {
          doNext = _handle({ event, handlers: handler });
        } else if (typeof handler === "function") {
          handler({
            event,
            next: () => {
              doNext = true;
            },
          });
        } else if (typeof handler === "object") {
          if (event.code in handler) {
            handler[event.code]({
              event,
              next: () => {
                doNext = true;
              },
            });
          } else {
            doNext = true;
          }
        } else {
          throw new JsonLdError(
            "Invalid event handler.",
            "jsonld.InvalidEventHandler",
            { event }
          );
        }
      }
      return doNext;
    }
    const _notSafeEventCodes = /* @__PURE__ */ new Set([
      "empty object",
      "free-floating scalar",
      "invalid @language value",
      "invalid property",
      // NOTE: spec edge case
      "null @id value",
      "null @value value",
      "object with only @id",
      "object with only @language",
      "object with only @list",
      "object with only @value",
      "relative @id reference",
      "relative @type reference",
      "relative @vocab reference",
      "reserved @id value",
      "reserved @reverse value",
      "reserved term",
      // toRDF
      "blank node predicate",
      "relative graph reference",
      "relative object reference",
      "relative predicate reference",
      "relative subject reference",
    ]);
    api.safeEventHandler = function safeEventHandler({ event, next }) {
      if (event.level === "warning" && _notSafeEventCodes.has(event.code)) {
        throw new JsonLdError(
          "Safe mode validation error.",
          "jsonld.ValidationError",
          { event }
        );
      }
      next();
    };
    api.logEventHandler = function logEventHandler({ event, next }) {
      console.log(`EVENT: ${event.message}`, { event });
      next();
    };
    api.logWarningEventHandler = function logWarningEventHandler({
      event,
      next,
    }) {
      if (event.level === "warning") {
        console.warn(`WARNING: ${event.message}`, { event });
      }
      next();
    };
    api.unhandledEventHandler = function unhandledEventHandler({ event }) {
      throw new JsonLdError("No handler for event.", "jsonld.UnhandledEvent", {
        event,
      });
    };
    api.setDefaultEventHandler = function ({ eventHandler } = {}) {
      api.defaultEventHandler = eventHandler ? _asArray(eventHandler) : null;
    };
  },
});
var require_context = __commonJS({
  "node_modules/jsonld/lib/context.js"(exports, module2) {
    "use strict";
    const util = require_util();
    const JsonLdError = require_JsonLdError();
    const {
      isArray: _isArray,
      isObject: _isObject,
      isString: _isString,
      isUndefined: _isUndefined,
    } = require_types();
    const {
      isAbsolute: _isAbsoluteIri,
      isRelative: _isRelativeIri,
      prependBase,
    } = require_url();
    const { handleEvent: _handleEvent } = require_events();
    const {
      REGEX_BCP47,
      REGEX_KEYWORD,
      asArray: _asArray,
      compareShortestLeast: _compareShortestLeast,
    } = require_util();
    const INITIAL_CONTEXT_CACHE = /* @__PURE__ */ new Map();
    const INITIAL_CONTEXT_CACHE_MAX_SIZE = 1e4;
    const api = {};
    module2.exports = api;
    api.process = async ({
      activeCtx,
      localCtx,
      options,
      propagate = true,
      overrideProtected = false,
      cycles = /* @__PURE__ */ new Set(),
    }) => {
      if (
        _isObject(localCtx) &&
        "@context" in localCtx &&
        _isArray(localCtx["@context"])
      ) {
        localCtx = localCtx["@context"];
      }
      const ctxs = _asArray(localCtx);
      if (ctxs.length === 0) {
        return activeCtx;
      }
      const events = [];
      const eventCaptureHandler = [
        ({ event, next }) => {
          events.push(event);
          next();
        },
      ];
      if (options.eventHandler) {
        eventCaptureHandler.push(options.eventHandler);
      }
      const originalOptions = options;
      options = { ...options, eventHandler: eventCaptureHandler };
      const resolved = await options.contextResolver.resolve({
        activeCtx,
        context: localCtx,
        documentLoader: options.documentLoader,
        base: options.base,
      });
      if (
        _isObject(resolved[0].document) &&
        typeof resolved[0].document["@propagate"] === "boolean"
      ) {
        propagate = resolved[0].document["@propagate"];
      }
      let rval = activeCtx;
      if (!propagate && !rval.previousContext) {
        rval = rval.clone();
        rval.previousContext = activeCtx;
      }
      for (const resolvedContext of resolved) {
        let { document: ctx } = resolvedContext;
        activeCtx = rval;
        if (ctx === null) {
          if (
            !overrideProtected &&
            Object.keys(activeCtx.protected).length !== 0
          ) {
            throw new JsonLdError(
              "Tried to nullify a context with protected terms outside of a term definition.",
              "jsonld.SyntaxError",
              { code: "invalid context nullification" }
            );
          }
          rval = activeCtx = api.getInitialContext(options).clone();
          continue;
        }
        const processed = resolvedContext.getProcessed(activeCtx);
        if (processed) {
          if (originalOptions.eventHandler) {
            for (const event of processed.events) {
              _handleEvent({ event, options: originalOptions });
            }
          }
          rval = activeCtx = processed.context;
          continue;
        }
        if (_isObject(ctx) && "@context" in ctx) {
          ctx = ctx["@context"];
        }
        if (!_isObject(ctx)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; @context must be an object.",
            "jsonld.SyntaxError",
            { code: "invalid local context", context: ctx }
          );
        }
        rval = rval.clone();
        const defined = /* @__PURE__ */ new Map();
        if ("@version" in ctx) {
          if (ctx["@version"] !== 1.1) {
            throw new JsonLdError(
              "Unsupported JSON-LD version: " + ctx["@version"],
              "jsonld.UnsupportedVersion",
              { code: "invalid @version value", context: ctx }
            );
          }
          if (
            activeCtx.processingMode &&
            activeCtx.processingMode === "json-ld-1.0"
          ) {
            throw new JsonLdError(
              "@version: " +
                ctx["@version"] +
                " not compatible with " +
                activeCtx.processingMode,
              "jsonld.ProcessingModeConflict",
              { code: "processing mode conflict", context: ctx }
            );
          }
          rval.processingMode = "json-ld-1.1";
          rval["@version"] = ctx["@version"];
          defined.set("@version", true);
        }
        rval.processingMode = rval.processingMode || activeCtx.processingMode;
        if ("@base" in ctx) {
          let base = ctx["@base"];
          if (base === null || _isAbsoluteIri(base)) {
          } else if (_isRelativeIri(base)) {
            base = prependBase(rval["@base"], base);
          } else {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; the value of "@base" in a @context must be an absolute IRI, a relative IRI, or null.',
              "jsonld.SyntaxError",
              { code: "invalid base IRI", context: ctx }
            );
          }
          rval["@base"] = base;
          defined.set("@base", true);
        }
        if ("@vocab" in ctx) {
          const value = ctx["@vocab"];
          if (value === null) {
            delete rval["@vocab"];
          } else if (!_isString(value)) {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; the value of "@vocab" in a @context must be a string or null.',
              "jsonld.SyntaxError",
              { code: "invalid vocab mapping", context: ctx }
            );
          } else if (!_isAbsoluteIri(value) && api.processingMode(rval, 1)) {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; the value of "@vocab" in a @context must be an absolute IRI.',
              "jsonld.SyntaxError",
              { code: "invalid vocab mapping", context: ctx }
            );
          } else {
            const vocab = _expandIri(
              rval,
              value,
              { vocab: true, base: true },
              void 0,
              void 0,
              options
            );
            if (!_isAbsoluteIri(vocab)) {
              if (options.eventHandler) {
                _handleEvent({
                  event: {
                    type: ["JsonLdEvent"],
                    code: "relative @vocab reference",
                    level: "warning",
                    message: "Relative @vocab reference found.",
                    details: {
                      vocab,
                    },
                  },
                  options,
                });
              }
            }
            rval["@vocab"] = vocab;
          }
          defined.set("@vocab", true);
        }
        if ("@language" in ctx) {
          const value = ctx["@language"];
          if (value === null) {
            delete rval["@language"];
          } else if (!_isString(value)) {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; the value of "@language" in a @context must be a string or null.',
              "jsonld.SyntaxError",
              { code: "invalid default language", context: ctx }
            );
          } else {
            if (!value.match(REGEX_BCP47)) {
              if (options.eventHandler) {
                _handleEvent({
                  event: {
                    type: ["JsonLdEvent"],
                    code: "invalid @language value",
                    level: "warning",
                    message: "@language value must be valid BCP47.",
                    details: {
                      language: value,
                    },
                  },
                  options,
                });
              }
            }
            rval["@language"] = value.toLowerCase();
          }
          defined.set("@language", true);
        }
        if ("@direction" in ctx) {
          const value = ctx["@direction"];
          if (activeCtx.processingMode === "json-ld-1.0") {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; @direction not compatible with " +
                activeCtx.processingMode,
              "jsonld.SyntaxError",
              { code: "invalid context member", context: ctx }
            );
          }
          if (value === null) {
            delete rval["@direction"];
          } else if (value !== "ltr" && value !== "rtl") {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; the value of "@direction" in a @context must be null, "ltr", or "rtl".',
              "jsonld.SyntaxError",
              { code: "invalid base direction", context: ctx }
            );
          } else {
            rval["@direction"] = value;
          }
          defined.set("@direction", true);
        }
        if ("@propagate" in ctx) {
          const value = ctx["@propagate"];
          if (activeCtx.processingMode === "json-ld-1.0") {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; @propagate not compatible with " +
                activeCtx.processingMode,
              "jsonld.SyntaxError",
              { code: "invalid context entry", context: ctx }
            );
          }
          if (typeof value !== "boolean") {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; @propagate value must be a boolean.",
              "jsonld.SyntaxError",
              { code: "invalid @propagate value", context: localCtx }
            );
          }
          defined.set("@propagate", true);
        }
        if ("@import" in ctx) {
          const value = ctx["@import"];
          if (activeCtx.processingMode === "json-ld-1.0") {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; @import not compatible with " +
                activeCtx.processingMode,
              "jsonld.SyntaxError",
              { code: "invalid context entry", context: ctx }
            );
          }
          if (!_isString(value)) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; @import must be a string.",
              "jsonld.SyntaxError",
              { code: "invalid @import value", context: localCtx }
            );
          }
          const resolvedImport = await options.contextResolver.resolve({
            activeCtx,
            context: value,
            documentLoader: options.documentLoader,
            base: options.base,
          });
          if (resolvedImport.length !== 1) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; @import must reference a single context.",
              "jsonld.SyntaxError",
              { code: "invalid remote context", context: localCtx }
            );
          }
          const processedImport = resolvedImport[0].getProcessed(activeCtx);
          if (processedImport) {
            ctx = processedImport;
          } else {
            const importCtx = resolvedImport[0].document;
            if ("@import" in importCtx) {
              throw new JsonLdError(
                "Invalid JSON-LD syntax: imported context must not include @import.",
                "jsonld.SyntaxError",
                { code: "invalid context entry", context: localCtx }
              );
            }
            for (const key in importCtx) {
              if (!ctx.hasOwnProperty(key)) {
                ctx[key] = importCtx[key];
              }
            }
            resolvedImport[0].setProcessed(activeCtx, ctx);
          }
          defined.set("@import", true);
        }
        defined.set("@protected", ctx["@protected"] || false);
        for (const key in ctx) {
          api.createTermDefinition({
            activeCtx: rval,
            localCtx: ctx,
            term: key,
            defined,
            options,
            overrideProtected,
          });
          if (_isObject(ctx[key]) && "@context" in ctx[key]) {
            const keyCtx = ctx[key]["@context"];
            let process = true;
            if (_isString(keyCtx)) {
              const url = prependBase(options.base, keyCtx);
              if (cycles.has(url)) {
                process = false;
              } else {
                cycles.add(url);
              }
            }
            if (process) {
              try {
                await api.process({
                  activeCtx: rval.clone(),
                  localCtx: ctx[key]["@context"],
                  overrideProtected: true,
                  options,
                  cycles,
                });
              } catch (e) {
                throw new JsonLdError(
                  "Invalid JSON-LD syntax; invalid scoped context.",
                  "jsonld.SyntaxError",
                  {
                    code: "invalid scoped context",
                    context: ctx[key]["@context"],
                    term: key,
                  }
                );
              }
            }
          }
        }
        resolvedContext.setProcessed(activeCtx, {
          context: rval,
          events,
        });
      }
      return rval;
    };
    api.createTermDefinition = ({
      activeCtx,
      localCtx,
      term,
      defined,
      options,
      overrideProtected = false,
    }) => {
      if (defined.has(term)) {
        if (defined.get(term)) {
          return;
        }
        throw new JsonLdError(
          "Cyclical context definition detected.",
          "jsonld.CyclicalContext",
          { code: "cyclic IRI mapping", context: localCtx, term }
        );
      }
      defined.set(term, false);
      let value;
      if (localCtx.hasOwnProperty(term)) {
        value = localCtx[term];
      }
      if (
        term === "@type" &&
        _isObject(value) &&
        (value["@container"] || "@set") === "@set" &&
        api.processingMode(activeCtx, 1.1)
      ) {
        const validKeys2 = ["@container", "@id", "@protected"];
        const keys = Object.keys(value);
        if (keys.length === 0 || keys.some((k) => !validKeys2.includes(k))) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; keywords cannot be overridden.",
            "jsonld.SyntaxError",
            { code: "keyword redefinition", context: localCtx, term }
          );
        }
      } else if (api.isKeyword(term)) {
        throw new JsonLdError(
          "Invalid JSON-LD syntax; keywords cannot be overridden.",
          "jsonld.SyntaxError",
          { code: "keyword redefinition", context: localCtx, term }
        );
      } else if (term.match(REGEX_KEYWORD)) {
        if (options.eventHandler) {
          _handleEvent({
            event: {
              type: ["JsonLdEvent"],
              code: "reserved term",
              level: "warning",
              message:
                'Terms beginning with "@" are reserved for future use and dropped.',
              details: {
                term,
              },
            },
            options,
          });
        }
        return;
      } else if (term === "") {
        throw new JsonLdError(
          "Invalid JSON-LD syntax; a term cannot be an empty string.",
          "jsonld.SyntaxError",
          { code: "invalid term definition", context: localCtx }
        );
      }
      const previousMapping = activeCtx.mappings.get(term);
      if (activeCtx.mappings.has(term)) {
        activeCtx.mappings.delete(term);
      }
      let simpleTerm = false;
      if (_isString(value) || value === null) {
        simpleTerm = true;
        value = { "@id": value };
      }
      if (!_isObject(value)) {
        throw new JsonLdError(
          "Invalid JSON-LD syntax; @context term values must be strings or objects.",
          "jsonld.SyntaxError",
          { code: "invalid term definition", context: localCtx }
        );
      }
      const mapping = {};
      activeCtx.mappings.set(term, mapping);
      mapping.reverse = false;
      const validKeys = ["@container", "@id", "@language", "@reverse", "@type"];
      if (api.processingMode(activeCtx, 1.1)) {
        validKeys.push(
          "@context",
          "@direction",
          "@index",
          "@nest",
          "@prefix",
          "@protected"
        );
      }
      for (const kw in value) {
        if (!validKeys.includes(kw)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; a term definition must not contain " + kw,
            "jsonld.SyntaxError",
            { code: "invalid term definition", context: localCtx }
          );
        }
      }
      const colon = term.indexOf(":");
      mapping._termHasColon = colon > 0;
      if ("@reverse" in value) {
        if ("@id" in value) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; a @reverse term definition must not contain @id.",
            "jsonld.SyntaxError",
            { code: "invalid reverse property", context: localCtx }
          );
        }
        if ("@nest" in value) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; a @reverse term definition must not contain @nest.",
            "jsonld.SyntaxError",
            { code: "invalid reverse property", context: localCtx }
          );
        }
        const reverse = value["@reverse"];
        if (!_isString(reverse)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; a @context @reverse value must be a string.",
            "jsonld.SyntaxError",
            { code: "invalid IRI mapping", context: localCtx }
          );
        }
        if (reverse.match(REGEX_KEYWORD)) {
          if (options.eventHandler) {
            _handleEvent({
              event: {
                type: ["JsonLdEvent"],
                code: "reserved @reverse value",
                level: "warning",
                message:
                  '@reverse values beginning with "@" are reserved for future use and dropped.',
                details: {
                  reverse,
                },
              },
              options,
            });
          }
          if (previousMapping) {
            activeCtx.mappings.set(term, previousMapping);
          } else {
            activeCtx.mappings.delete(term);
          }
          return;
        }
        const id2 = _expandIri(
          activeCtx,
          reverse,
          { vocab: true, base: false },
          localCtx,
          defined,
          options
        );
        if (!_isAbsoluteIri(id2)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; a @context @reverse value must be an absolute IRI or a blank node identifier.",
            "jsonld.SyntaxError",
            { code: "invalid IRI mapping", context: localCtx }
          );
        }
        mapping["@id"] = id2;
        mapping.reverse = true;
      } else if ("@id" in value) {
        let id2 = value["@id"];
        if (id2 && !_isString(id2)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; a @context @id value must be an array of strings or a string.",
            "jsonld.SyntaxError",
            { code: "invalid IRI mapping", context: localCtx }
          );
        }
        if (id2 === null) {
          mapping["@id"] = null;
        } else if (!api.isKeyword(id2) && id2.match(REGEX_KEYWORD)) {
          if (options.eventHandler) {
            _handleEvent({
              event: {
                type: ["JsonLdEvent"],
                code: "reserved @id value",
                level: "warning",
                message:
                  '@id values beginning with "@" are reserved for future use and dropped.',
                details: {
                  id: id2,
                },
              },
              options,
            });
          }
          if (previousMapping) {
            activeCtx.mappings.set(term, previousMapping);
          } else {
            activeCtx.mappings.delete(term);
          }
          return;
        } else if (id2 !== term) {
          id2 = _expandIri(
            activeCtx,
            id2,
            { vocab: true, base: false },
            localCtx,
            defined,
            options
          );
          if (!_isAbsoluteIri(id2) && !api.isKeyword(id2)) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; a @context @id value must be an absolute IRI, a blank node identifier, or a keyword.",
              "jsonld.SyntaxError",
              { code: "invalid IRI mapping", context: localCtx }
            );
          }
          if (term.match(/(?::[^:])|\//)) {
            const termDefined = new Map(defined).set(term, true);
            const termIri = _expandIri(
              activeCtx,
              term,
              { vocab: true, base: false },
              localCtx,
              termDefined,
              options
            );
            if (termIri !== id2) {
              throw new JsonLdError(
                "Invalid JSON-LD syntax; term in form of IRI must expand to definition.",
                "jsonld.SyntaxError",
                { code: "invalid IRI mapping", context: localCtx }
              );
            }
          }
          mapping["@id"] = id2;
          mapping._prefix =
            simpleTerm && !mapping._termHasColon && id2.match(/[:\/\?#\[\]@]$/);
        }
      }
      if (!("@id" in mapping)) {
        if (mapping._termHasColon) {
          const prefix = term.substr(0, colon);
          if (localCtx.hasOwnProperty(prefix)) {
            api.createTermDefinition({
              activeCtx,
              localCtx,
              term: prefix,
              defined,
              options,
            });
          }
          if (activeCtx.mappings.has(prefix)) {
            const suffix = term.substr(colon + 1);
            mapping["@id"] = activeCtx.mappings.get(prefix)["@id"] + suffix;
          } else {
            mapping["@id"] = term;
          }
        } else if (term === "@type") {
          mapping["@id"] = term;
        } else {
          if (!("@vocab" in activeCtx)) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; @context terms must define an @id.",
              "jsonld.SyntaxError",
              { code: "invalid IRI mapping", context: localCtx, term }
            );
          }
          mapping["@id"] = activeCtx["@vocab"] + term;
        }
      }
      if (
        value["@protected"] === true ||
        (defined.get("@protected") === true && value["@protected"] !== false)
      ) {
        activeCtx.protected[term] = true;
        mapping.protected = true;
      }
      defined.set(term, true);
      if ("@type" in value) {
        let type = value["@type"];
        if (!_isString(type)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; an @context @type value must be a string.",
            "jsonld.SyntaxError",
            { code: "invalid type mapping", context: localCtx }
          );
        }
        if (type === "@json" || type === "@none") {
          if (api.processingMode(activeCtx, 1)) {
            throw new JsonLdError(
              `Invalid JSON-LD syntax; an @context @type value must not be "${type}" in JSON-LD 1.0 mode.`,
              "jsonld.SyntaxError",
              { code: "invalid type mapping", context: localCtx }
            );
          }
        } else if (type !== "@id" && type !== "@vocab") {
          type = _expandIri(
            activeCtx,
            type,
            { vocab: true, base: false },
            localCtx,
            defined,
            options
          );
          if (!_isAbsoluteIri(type)) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; an @context @type value must be an absolute IRI.",
              "jsonld.SyntaxError",
              { code: "invalid type mapping", context: localCtx }
            );
          }
          if (type.indexOf("_:") === 0) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; an @context @type value must be an IRI, not a blank node identifier.",
              "jsonld.SyntaxError",
              { code: "invalid type mapping", context: localCtx }
            );
          }
        }
        mapping["@type"] = type;
      }
      if ("@container" in value) {
        const container = _isString(value["@container"])
          ? [value["@container"]]
          : value["@container"] || [];
        const validContainers = ["@list", "@set", "@index", "@language"];
        let isValid = true;
        const hasSet = container.includes("@set");
        if (api.processingMode(activeCtx, 1.1)) {
          validContainers.push("@graph", "@id", "@type");
          if (container.includes("@list")) {
            if (container.length !== 1) {
              throw new JsonLdError(
                "Invalid JSON-LD syntax; @context @container with @list must have no other values",
                "jsonld.SyntaxError",
                { code: "invalid container mapping", context: localCtx }
              );
            }
          } else if (container.includes("@graph")) {
            if (
              container.some(
                (key) =>
                  key !== "@graph" &&
                  key !== "@id" &&
                  key !== "@index" &&
                  key !== "@set"
              )
            ) {
              throw new JsonLdError(
                "Invalid JSON-LD syntax; @context @container with @graph must have no other values other than @id, @index, and @set",
                "jsonld.SyntaxError",
                { code: "invalid container mapping", context: localCtx }
              );
            }
          } else {
            isValid &= container.length <= (hasSet ? 2 : 1);
          }
          if (container.includes("@type")) {
            mapping["@type"] = mapping["@type"] || "@id";
            if (!["@id", "@vocab"].includes(mapping["@type"])) {
              throw new JsonLdError(
                "Invalid JSON-LD syntax; container: @type requires @type to be @id or @vocab.",
                "jsonld.SyntaxError",
                { code: "invalid type mapping", context: localCtx }
              );
            }
          }
        } else {
          isValid &= !_isArray(value["@container"]);
          isValid &= container.length <= 1;
        }
        isValid &= container.every((c) => validContainers.includes(c));
        isValid &= !(hasSet && container.includes("@list"));
        if (!isValid) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; @context @container value must be one of the following: " +
              validContainers.join(", "),
            "jsonld.SyntaxError",
            { code: "invalid container mapping", context: localCtx }
          );
        }
        if (
          mapping.reverse &&
          !container.every((c) => ["@index", "@set"].includes(c))
        ) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; @context @container value for a @reverse type definition must be @index or @set.",
            "jsonld.SyntaxError",
            { code: "invalid reverse property", context: localCtx }
          );
        }
        mapping["@container"] = container;
      }
      if ("@index" in value) {
        if (
          !("@container" in value) ||
          !mapping["@container"].includes("@index")
        ) {
          throw new JsonLdError(
            `Invalid JSON-LD syntax; @index without @index in @container: "${value["@index"]}" on term "${term}".`,
            "jsonld.SyntaxError",
            { code: "invalid term definition", context: localCtx }
          );
        }
        if (!_isString(value["@index"]) || value["@index"].indexOf("@") === 0) {
          throw new JsonLdError(
            `Invalid JSON-LD syntax; @index must expand to an IRI: "${value["@index"]}" on term "${term}".`,
            "jsonld.SyntaxError",
            { code: "invalid term definition", context: localCtx }
          );
        }
        mapping["@index"] = value["@index"];
      }
      if ("@context" in value) {
        mapping["@context"] = value["@context"];
      }
      if ("@language" in value && !("@type" in value)) {
        let language = value["@language"];
        if (language !== null && !_isString(language)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; @context @language value must be a string or null.",
            "jsonld.SyntaxError",
            { code: "invalid language mapping", context: localCtx }
          );
        }
        if (language !== null) {
          language = language.toLowerCase();
        }
        mapping["@language"] = language;
      }
      if ("@prefix" in value) {
        if (term.match(/:|\//)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; @context @prefix used on a compact IRI term",
            "jsonld.SyntaxError",
            { code: "invalid term definition", context: localCtx }
          );
        }
        if (api.isKeyword(mapping["@id"])) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; keywords may not be used as prefixes",
            "jsonld.SyntaxError",
            { code: "invalid term definition", context: localCtx }
          );
        }
        if (typeof value["@prefix"] === "boolean") {
          mapping._prefix = value["@prefix"] === true;
        } else {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; @context value for @prefix must be boolean",
            "jsonld.SyntaxError",
            { code: "invalid @prefix value", context: localCtx }
          );
        }
      }
      if ("@direction" in value) {
        const direction = value["@direction"];
        if (direction !== null && direction !== "ltr" && direction !== "rtl") {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; @direction value must be null, "ltr", or "rtl".',
            "jsonld.SyntaxError",
            { code: "invalid base direction", context: localCtx }
          );
        }
        mapping["@direction"] = direction;
      }
      if ("@nest" in value) {
        const nest = value["@nest"];
        if (!_isString(nest) || (nest !== "@nest" && nest.indexOf("@") === 0)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; @context @nest value must be a string which is not a keyword other than @nest.",
            "jsonld.SyntaxError",
            { code: "invalid @nest value", context: localCtx }
          );
        }
        mapping["@nest"] = nest;
      }
      const id = mapping["@id"];
      if (id === "@context" || id === "@preserve") {
        throw new JsonLdError(
          "Invalid JSON-LD syntax; @context and @preserve cannot be aliased.",
          "jsonld.SyntaxError",
          { code: "invalid keyword alias", context: localCtx }
        );
      }
      if (previousMapping && previousMapping.protected && !overrideProtected) {
        activeCtx.protected[term] = true;
        mapping.protected = true;
        if (!_deepCompare(previousMapping, mapping)) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; tried to redefine a protected term.",
            "jsonld.SyntaxError",
            { code: "protected term redefinition", context: localCtx, term }
          );
        }
      }
    };
    api.expandIri = (activeCtx, value, relativeTo, options) => {
      return _expandIri(activeCtx, value, relativeTo, void 0, void 0, options);
    };
    function _expandIri(
      activeCtx,
      value,
      relativeTo,
      localCtx,
      defined,
      options
    ) {
      if (value === null || !_isString(value) || api.isKeyword(value)) {
        return value;
      }
      if (value.match(REGEX_KEYWORD)) {
        return null;
      }
      if (
        localCtx &&
        localCtx.hasOwnProperty(value) &&
        defined.get(value) !== true
      ) {
        api.createTermDefinition({
          activeCtx,
          localCtx,
          term: value,
          defined,
          options,
        });
      }
      relativeTo = relativeTo || {};
      if (relativeTo.vocab) {
        const mapping = activeCtx.mappings.get(value);
        if (mapping === null) {
          return null;
        }
        if (_isObject(mapping) && "@id" in mapping) {
          return mapping["@id"];
        }
      }
      const colon = value.indexOf(":");
      if (colon > 0) {
        const prefix = value.substr(0, colon);
        const suffix = value.substr(colon + 1);
        if (prefix === "_" || suffix.indexOf("//") === 0) {
          return value;
        }
        if (localCtx && localCtx.hasOwnProperty(prefix)) {
          api.createTermDefinition({
            activeCtx,
            localCtx,
            term: prefix,
            defined,
            options,
          });
        }
        const mapping = activeCtx.mappings.get(prefix);
        if (mapping && mapping._prefix) {
          return mapping["@id"] + suffix;
        }
        if (_isAbsoluteIri(value)) {
          return value;
        }
      }
      if (relativeTo.vocab && "@vocab" in activeCtx) {
        const prependedResult = activeCtx["@vocab"] + value;
        value = prependedResult;
      } else if (relativeTo.base) {
        let prependedResult;
        let base;
        if ("@base" in activeCtx) {
          if (activeCtx["@base"]) {
            base = prependBase(options.base, activeCtx["@base"]);
            prependedResult = prependBase(base, value);
          } else {
            base = activeCtx["@base"];
            prependedResult = value;
          }
        } else {
          base = options.base;
          prependedResult = prependBase(options.base, value);
        }
        value = prependedResult;
      }
      return value;
    }
    api.getInitialContext = (options) => {
      const key = JSON.stringify({ processingMode: options.processingMode });
      const cached = INITIAL_CONTEXT_CACHE.get(key);
      if (cached) {
        return cached;
      }
      const initialContext = {
        processingMode: options.processingMode,
        mappings: /* @__PURE__ */ new Map(),
        inverse: null,
        getInverse: _createInverseContext,
        clone: _cloneActiveContext,
        revertToPreviousContext: _revertToPreviousContext,
        protected: {},
      };
      if (INITIAL_CONTEXT_CACHE.size === INITIAL_CONTEXT_CACHE_MAX_SIZE) {
        INITIAL_CONTEXT_CACHE.clear();
      }
      INITIAL_CONTEXT_CACHE.set(key, initialContext);
      return initialContext;
      function _createInverseContext() {
        const activeCtx = this;
        if (activeCtx.inverse) {
          return activeCtx.inverse;
        }
        const inverse = (activeCtx.inverse = {});
        const fastCurieMap = (activeCtx.fastCurieMap = {});
        const irisToTerms = {};
        const defaultLanguage = (
          activeCtx["@language"] || "@none"
        ).toLowerCase();
        const defaultDirection = activeCtx["@direction"];
        const mappings = activeCtx.mappings;
        const terms = [...mappings.keys()].sort(_compareShortestLeast);
        for (const term of terms) {
          const mapping = mappings.get(term);
          if (mapping === null) {
            continue;
          }
          let container = mapping["@container"] || "@none";
          container = [].concat(container).sort().join("");
          if (mapping["@id"] === null) {
            continue;
          }
          const ids = _asArray(mapping["@id"]);
          for (const iri of ids) {
            let entry = inverse[iri];
            const isKeyword = api.isKeyword(iri);
            if (!entry) {
              inverse[iri] = entry = {};
              if (!isKeyword && !mapping._termHasColon) {
                irisToTerms[iri] = [term];
                const fastCurieEntry = { iri, terms: irisToTerms[iri] };
                if (iri[0] in fastCurieMap) {
                  fastCurieMap[iri[0]].push(fastCurieEntry);
                } else {
                  fastCurieMap[iri[0]] = [fastCurieEntry];
                }
              }
            } else if (!isKeyword && !mapping._termHasColon) {
              irisToTerms[iri].push(term);
            }
            if (!entry[container]) {
              entry[container] = {
                "@language": {},
                "@type": {},
                "@any": {},
              };
            }
            entry = entry[container];
            _addPreferredTerm(term, entry["@any"], "@none");
            if (mapping.reverse) {
              _addPreferredTerm(term, entry["@type"], "@reverse");
            } else if (mapping["@type"] === "@none") {
              _addPreferredTerm(term, entry["@any"], "@none");
              _addPreferredTerm(term, entry["@language"], "@none");
              _addPreferredTerm(term, entry["@type"], "@none");
            } else if ("@type" in mapping) {
              _addPreferredTerm(term, entry["@type"], mapping["@type"]);
            } else if ("@language" in mapping && "@direction" in mapping) {
              const language = mapping["@language"];
              const direction = mapping["@direction"];
              if (language && direction) {
                _addPreferredTerm(
                  term,
                  entry["@language"],
                  `${language}_${direction}`.toLowerCase()
                );
              } else if (language) {
                _addPreferredTerm(
                  term,
                  entry["@language"],
                  language.toLowerCase()
                );
              } else if (direction) {
                _addPreferredTerm(term, entry["@language"], `_${direction}`);
              } else {
                _addPreferredTerm(term, entry["@language"], "@null");
              }
            } else if ("@language" in mapping) {
              _addPreferredTerm(
                term,
                entry["@language"],
                (mapping["@language"] || "@null").toLowerCase()
              );
            } else if ("@direction" in mapping) {
              if (mapping["@direction"]) {
                _addPreferredTerm(
                  term,
                  entry["@language"],
                  `_${mapping["@direction"]}`
                );
              } else {
                _addPreferredTerm(term, entry["@language"], "@none");
              }
            } else if (defaultDirection) {
              _addPreferredTerm(
                term,
                entry["@language"],
                `_${defaultDirection}`
              );
              _addPreferredTerm(term, entry["@language"], "@none");
              _addPreferredTerm(term, entry["@type"], "@none");
            } else {
              _addPreferredTerm(term, entry["@language"], defaultLanguage);
              _addPreferredTerm(term, entry["@language"], "@none");
              _addPreferredTerm(term, entry["@type"], "@none");
            }
          }
        }
        for (const key2 in fastCurieMap) {
          _buildIriMap(fastCurieMap, key2, 1);
        }
        return inverse;
      }
      function _buildIriMap(iriMap, key2, idx) {
        const entries = iriMap[key2];
        const next = (iriMap[key2] = {});
        let iri;
        let letter;
        for (const entry of entries) {
          iri = entry.iri;
          if (idx >= iri.length) {
            letter = "";
          } else {
            letter = iri[idx];
          }
          if (letter in next) {
            next[letter].push(entry);
          } else {
            next[letter] = [entry];
          }
        }
        for (const key3 in next) {
          if (key3 === "") {
            continue;
          }
          _buildIriMap(next, key3, idx + 1);
        }
      }
      function _addPreferredTerm(term, entry, typeOrLanguageValue) {
        if (!entry.hasOwnProperty(typeOrLanguageValue)) {
          entry[typeOrLanguageValue] = term;
        }
      }
      function _cloneActiveContext() {
        const child = {};
        child.mappings = util.clone(this.mappings);
        child.clone = this.clone;
        child.inverse = null;
        child.getInverse = this.getInverse;
        child.protected = util.clone(this.protected);
        if (this.previousContext) {
          child.previousContext = this.previousContext.clone();
        }
        child.revertToPreviousContext = this.revertToPreviousContext;
        if ("@base" in this) {
          child["@base"] = this["@base"];
        }
        if ("@language" in this) {
          child["@language"] = this["@language"];
        }
        if ("@vocab" in this) {
          child["@vocab"] = this["@vocab"];
        }
        return child;
      }
      function _revertToPreviousContext() {
        if (!this.previousContext) {
          return this;
        }
        return this.previousContext.clone();
      }
    };
    api.getContextValue = (ctx, key, type) => {
      if (key === null) {
        if (type === "@context") {
          return void 0;
        }
        return null;
      }
      if (ctx.mappings.has(key)) {
        const entry = ctx.mappings.get(key);
        if (_isUndefined(type)) {
          return entry;
        }
        if (entry.hasOwnProperty(type)) {
          return entry[type];
        }
      }
      if (type === "@language" && type in ctx) {
        return ctx[type];
      }
      if (type === "@direction" && type in ctx) {
        return ctx[type];
      }
      if (type === "@context") {
        return void 0;
      }
      return null;
    };
    api.processingMode = (activeCtx, version) => {
      if (version.toString() >= "1.1") {
        return (
          !activeCtx.processingMode ||
          activeCtx.processingMode >= "json-ld-" + version.toString()
        );
      } else {
        return activeCtx.processingMode === "json-ld-1.0";
      }
    };
    api.isKeyword = (v) => {
      if (!_isString(v) || v[0] !== "@") {
        return false;
      }
      switch (v) {
        case "@base":
        case "@container":
        case "@context":
        case "@default":
        case "@direction":
        case "@embed":
        case "@explicit":
        case "@graph":
        case "@id":
        case "@included":
        case "@index":
        case "@json":
        case "@language":
        case "@list":
        case "@nest":
        case "@none":
        case "@omitDefault":
        case "@prefix":
        case "@preserve":
        case "@protected":
        case "@requireAll":
        case "@reverse":
        case "@set":
        case "@type":
        case "@value":
        case "@version":
        case "@vocab":
          return true;
      }
      return false;
    };
    function _deepCompare(x1, x2) {
      if (!(x1 && typeof x1 === "object") || !(x2 && typeof x2 === "object")) {
        return x1 === x2;
      }
      const x1Array = Array.isArray(x1);
      if (x1Array !== Array.isArray(x2)) {
        return false;
      }
      if (x1Array) {
        if (x1.length !== x2.length) {
          return false;
        }
        for (let i = 0; i < x1.length; ++i) {
          if (!_deepCompare(x1[i], x2[i])) {
            return false;
          }
        }
        return true;
      }
      const k1s = Object.keys(x1);
      const k2s = Object.keys(x2);
      if (k1s.length !== k2s.length) {
        return false;
      }
      for (const k1 in x1) {
        let v1 = x1[k1];
        let v2 = x2[k1];
        if (k1 === "@container") {
          if (Array.isArray(v1) && Array.isArray(v2)) {
            v1 = v1.slice().sort();
            v2 = v2.slice().sort();
          }
        }
        if (!_deepCompare(v1, v2)) {
          return false;
        }
      }
      return true;
    }
  },
});
var require_expand = __commonJS({
  "node_modules/jsonld/lib/expand.js"(exports, module2) {
    "use strict";
    const JsonLdError = require_JsonLdError();
    const {
      isArray: _isArray,
      isObject: _isObject,
      isEmptyObject: _isEmptyObject,
      isString: _isString,
      isUndefined: _isUndefined,
    } = require_types();
    const {
      isList: _isList,
      isValue: _isValue,
      isGraph: _isGraph,
      isSubject: _isSubject,
    } = require_graphTypes();
    const {
      expandIri: _expandIri,
      getContextValue: _getContextValue,
      isKeyword: _isKeyword,
      process: _processContext,
      processingMode: _processingMode,
    } = require_context();
    const { isAbsolute: _isAbsoluteIri } = require_url();
    const {
      REGEX_BCP47,
      REGEX_KEYWORD,
      addValue: _addValue,
      asArray: _asArray,
      getValues: _getValues,
      validateTypeValue: _validateTypeValue,
    } = require_util();
    const { handleEvent: _handleEvent } = require_events();
    const api = {};
    module2.exports = api;
    api.expand = async ({
      activeCtx,
      activeProperty = null,
      element,
      options = {},
      insideList = false,
      insideIndex = false,
      typeScopedContext = null,
    }) => {
      if (element === null || element === void 0) {
        return null;
      }
      if (activeProperty === "@default") {
        options = Object.assign({}, options, { isFrame: false });
      }
      if (!_isArray(element) && !_isObject(element)) {
        if (
          !insideList &&
          (activeProperty === null ||
            _expandIri(activeCtx, activeProperty, { vocab: true }, options) ===
              "@graph")
        ) {
          if (options.eventHandler) {
            _handleEvent({
              event: {
                type: ["JsonLdEvent"],
                code: "free-floating scalar",
                level: "warning",
                message: "Dropping free-floating scalar not in a list.",
                details: {
                  value: element,
                  //activeProperty
                  //insideList
                },
              },
              options,
            });
          }
          return null;
        }
        return _expandValue({
          activeCtx,
          activeProperty,
          value: element,
          options,
        });
      }
      if (_isArray(element)) {
        let rval2 = [];
        const container =
          _getContextValue(activeCtx, activeProperty, "@container") || [];
        insideList = insideList || container.includes("@list");
        for (let i = 0; i < element.length; ++i) {
          let e = await api.expand({
            activeCtx,
            activeProperty,
            element: element[i],
            options,
            insideIndex,
            typeScopedContext,
          });
          if (insideList && _isArray(e)) {
            e = { "@list": e };
          }
          if (e === null) {
            continue;
          }
          if (_isArray(e)) {
            rval2 = rval2.concat(e);
          } else {
            rval2.push(e);
          }
        }
        return rval2;
      }
      const expandedActiveProperty = _expandIri(
        activeCtx,
        activeProperty,
        { vocab: true },
        options
      );
      const propertyScopedCtx = _getContextValue(
        activeCtx,
        activeProperty,
        "@context"
      );
      typeScopedContext =
        typeScopedContext || (activeCtx.previousContext ? activeCtx : null);
      let keys = Object.keys(element).sort();
      let mustRevert = !insideIndex;
      if (
        mustRevert &&
        typeScopedContext &&
        keys.length <= 2 &&
        !keys.includes("@context")
      ) {
        for (const key of keys) {
          const expandedProperty = _expandIri(
            typeScopedContext,
            key,
            { vocab: true },
            options
          );
          if (expandedProperty === "@value") {
            mustRevert = false;
            activeCtx = typeScopedContext;
            break;
          }
          if (expandedProperty === "@id" && keys.length === 1) {
            mustRevert = false;
            break;
          }
        }
      }
      if (mustRevert) {
        activeCtx = activeCtx.revertToPreviousContext();
      }
      if (!_isUndefined(propertyScopedCtx)) {
        activeCtx = await _processContext({
          activeCtx,
          localCtx: propertyScopedCtx,
          propagate: true,
          overrideProtected: true,
          options,
        });
      }
      if ("@context" in element) {
        activeCtx = await _processContext({
          activeCtx,
          localCtx: element["@context"],
          options,
        });
      }
      typeScopedContext = activeCtx;
      let typeKey = null;
      for (const key of keys) {
        const expandedProperty = _expandIri(
          activeCtx,
          key,
          { vocab: true },
          options
        );
        if (expandedProperty === "@type") {
          typeKey = typeKey || key;
          const value = element[key];
          const types = Array.isArray(value)
            ? value.length > 1
              ? value.slice().sort()
              : value
            : [value];
          for (const type of types) {
            const ctx = _getContextValue(typeScopedContext, type, "@context");
            if (!_isUndefined(ctx)) {
              activeCtx = await _processContext({
                activeCtx,
                localCtx: ctx,
                options,
                propagate: false,
              });
            }
          }
        }
      }
      let rval = {};
      await _expandObject({
        activeCtx,
        activeProperty,
        expandedActiveProperty,
        element,
        expandedParent: rval,
        options,
        insideList,
        typeKey,
        typeScopedContext,
      });
      keys = Object.keys(rval);
      let count = keys.length;
      if ("@value" in rval) {
        if ("@type" in rval && ("@language" in rval || "@direction" in rval)) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; an element containing "@value" may not contain both "@type" and either "@language" or "@direction".',
            "jsonld.SyntaxError",
            { code: "invalid value object", element: rval }
          );
        }
        let validCount = count - 1;
        if ("@type" in rval) {
          validCount -= 1;
        }
        if ("@index" in rval) {
          validCount -= 1;
        }
        if ("@language" in rval) {
          validCount -= 1;
        }
        if ("@direction" in rval) {
          validCount -= 1;
        }
        if (validCount !== 0) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; an element containing "@value" may only have an "@index" property and either "@type" or either or both "@language" or "@direction".',
            "jsonld.SyntaxError",
            { code: "invalid value object", element: rval }
          );
        }
        const values = rval["@value"] === null ? [] : _asArray(rval["@value"]);
        const types = _getValues(rval, "@type");
        if (
          _processingMode(activeCtx, 1.1) &&
          types.includes("@json") &&
          types.length === 1
        ) {
        } else if (values.length === 0) {
          if (options.eventHandler) {
            _handleEvent({
              event: {
                type: ["JsonLdEvent"],
                code: "null @value value",
                level: "warning",
                message: "Dropping null @value value.",
                details: {
                  value: rval,
                },
              },
              options,
            });
          }
          rval = null;
        } else if (
          !values.every((v) => _isString(v) || _isEmptyObject(v)) &&
          "@language" in rval
        ) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; only strings may be language-tagged.",
            "jsonld.SyntaxError",
            { code: "invalid language-tagged value", element: rval }
          );
        } else if (
          !types.every(
            (t) =>
              (_isAbsoluteIri(t) && !(_isString(t) && t.indexOf("_:") === 0)) ||
              _isEmptyObject(t)
          )
        ) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; an element containing "@value" and "@type" must have an absolute IRI for the value of "@type".',
            "jsonld.SyntaxError",
            { code: "invalid typed value", element: rval }
          );
        }
      } else if ("@type" in rval && !_isArray(rval["@type"])) {
        rval["@type"] = [rval["@type"]];
      } else if ("@set" in rval || "@list" in rval) {
        if (count > 1 && !(count === 2 && "@index" in rval)) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; if an element has the property "@set" or "@list", then it can have at most one other property that is "@index".',
            "jsonld.SyntaxError",
            { code: "invalid set or list object", element: rval }
          );
        }
        if ("@set" in rval) {
          rval = rval["@set"];
          keys = Object.keys(rval);
          count = keys.length;
        }
      } else if (count === 1 && "@language" in rval) {
        if (options.eventHandler) {
          _handleEvent({
            event: {
              type: ["JsonLdEvent"],
              code: "object with only @language",
              level: "warning",
              message: "Dropping object with only @language.",
              details: {
                value: rval,
              },
            },
            options,
          });
        }
        rval = null;
      }
      if (
        _isObject(rval) &&
        !options.keepFreeFloatingNodes &&
        !insideList &&
        (activeProperty === null ||
          expandedActiveProperty === "@graph" ||
          (
            _getContextValue(activeCtx, activeProperty, "@container") || []
          ).includes("@graph"))
      ) {
        rval = _dropUnsafeObject({ value: rval, count, options });
      }
      return rval;
    };
    function _dropUnsafeObject({ value, count, options }) {
      if (
        count === 0 ||
        "@value" in value ||
        "@list" in value ||
        (count === 1 && "@id" in value)
      ) {
        if (options.eventHandler) {
          let code;
          let message;
          if (count === 0) {
            code = "empty object";
            message = "Dropping empty object.";
          } else if ("@value" in value) {
            code = "object with only @value";
            message = "Dropping object with only @value.";
          } else if ("@list" in value) {
            code = "object with only @list";
            message = "Dropping object with only @list.";
          } else if (count === 1 && "@id" in value) {
            code = "object with only @id";
            message = "Dropping object with only @id.";
          }
          _handleEvent({
            event: {
              type: ["JsonLdEvent"],
              code,
              level: "warning",
              message,
              details: {
                value,
              },
            },
            options,
          });
        }
        return null;
      }
      return value;
    }
    async function _expandObject({
      activeCtx,
      activeProperty,
      expandedActiveProperty,
      element,
      expandedParent,
      options = {},
      insideList,
      typeKey,
      typeScopedContext,
    }) {
      const keys = Object.keys(element).sort();
      const nests = [];
      let unexpandedValue;
      const isJsonType =
        element[typeKey] &&
        _expandIri(
          activeCtx,
          _isArray(element[typeKey]) ? element[typeKey][0] : element[typeKey],
          { vocab: true },
          {
            ...options,
            typeExpansion: true,
          }
        ) === "@json";
      for (const key of keys) {
        let value = element[key];
        let expandedValue;
        if (key === "@context") {
          continue;
        }
        const expandedProperty = _expandIri(
          activeCtx,
          key,
          { vocab: true },
          options
        );
        if (
          expandedProperty === null ||
          !(_isAbsoluteIri(expandedProperty) || _isKeyword(expandedProperty))
        ) {
          if (options.eventHandler) {
            _handleEvent({
              event: {
                type: ["JsonLdEvent"],
                code: "invalid property",
                level: "warning",
                message:
                  "Dropping property that did not expand into an absolute IRI or keyword.",
                details: {
                  property: key,
                  expandedProperty,
                },
              },
              options,
            });
          }
          continue;
        }
        if (_isKeyword(expandedProperty)) {
          if (expandedActiveProperty === "@reverse") {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; a keyword cannot be used as a @reverse property.",
              "jsonld.SyntaxError",
              { code: "invalid reverse property map", value }
            );
          }
          if (
            expandedProperty in expandedParent &&
            expandedProperty !== "@included" &&
            expandedProperty !== "@type"
          ) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; colliding keywords detected.",
              "jsonld.SyntaxError",
              { code: "colliding keywords", keyword: expandedProperty }
            );
          }
        }
        if (expandedProperty === "@id") {
          if (!_isString(value)) {
            if (!options.isFrame) {
              throw new JsonLdError(
                'Invalid JSON-LD syntax; "@id" value must a string.',
                "jsonld.SyntaxError",
                { code: "invalid @id value", value }
              );
            }
            if (_isObject(value)) {
              if (!_isEmptyObject(value)) {
                throw new JsonLdError(
                  'Invalid JSON-LD syntax; "@id" value an empty object or array of strings, if framing',
                  "jsonld.SyntaxError",
                  { code: "invalid @id value", value }
                );
              }
            } else if (_isArray(value)) {
              if (!value.every((v) => _isString(v))) {
                throw new JsonLdError(
                  'Invalid JSON-LD syntax; "@id" value an empty object or array of strings, if framing',
                  "jsonld.SyntaxError",
                  { code: "invalid @id value", value }
                );
              }
            } else {
              throw new JsonLdError(
                'Invalid JSON-LD syntax; "@id" value an empty object or array of strings, if framing',
                "jsonld.SyntaxError",
                { code: "invalid @id value", value }
              );
            }
          }
          _addValue(
            expandedParent,
            "@id",
            _asArray(value).map((v) => {
              if (_isString(v)) {
                const ve = _expandIri(activeCtx, v, { base: true }, options);
                if (options.eventHandler) {
                  if (ve === null) {
                    if (v === null) {
                      _handleEvent({
                        event: {
                          type: ["JsonLdEvent"],
                          code: "null @id value",
                          level: "warning",
                          message: "Null @id found.",
                          details: {
                            id: v,
                          },
                        },
                        options,
                      });
                    } else {
                      _handleEvent({
                        event: {
                          type: ["JsonLdEvent"],
                          code: "reserved @id value",
                          level: "warning",
                          message: "Reserved @id found.",
                          details: {
                            id: v,
                          },
                        },
                        options,
                      });
                    }
                  } else if (!_isAbsoluteIri(ve)) {
                    _handleEvent({
                      event: {
                        type: ["JsonLdEvent"],
                        code: "relative @id reference",
                        level: "warning",
                        message: "Relative @id reference found.",
                        details: {
                          id: v,
                          expandedId: ve,
                        },
                      },
                      options,
                    });
                  }
                }
                return ve;
              }
              return v;
            }),
            { propertyIsArray: options.isFrame }
          );
          continue;
        }
        if (expandedProperty === "@type") {
          if (_isObject(value)) {
            value = Object.fromEntries(
              Object.entries(value).map(([k, v]) => [
                _expandIri(typeScopedContext, k, { vocab: true }),
                _asArray(v).map((vv) =>
                  _expandIri(
                    typeScopedContext,
                    vv,
                    { base: true, vocab: true },
                    { ...options, typeExpansion: true }
                  )
                ),
              ])
            );
          }
          _validateTypeValue(value, options.isFrame);
          _addValue(
            expandedParent,
            "@type",
            _asArray(value).map((v) => {
              if (_isString(v)) {
                const ve = _expandIri(
                  typeScopedContext,
                  v,
                  { base: true, vocab: true },
                  { ...options, typeExpansion: true }
                );
                if (ve !== "@json" && !_isAbsoluteIri(ve)) {
                  if (options.eventHandler) {
                    _handleEvent({
                      event: {
                        type: ["JsonLdEvent"],
                        code: "relative @type reference",
                        level: "warning",
                        message: "Relative @type reference found.",
                        details: {
                          type: v,
                        },
                      },
                      options,
                    });
                  }
                }
                return ve;
              }
              return v;
            }),
            { propertyIsArray: !!options.isFrame }
          );
          continue;
        }
        if (
          expandedProperty === "@included" &&
          _processingMode(activeCtx, 1.1)
        ) {
          const includedResult = _asArray(
            await api.expand({
              activeCtx,
              activeProperty,
              element: value,
              options,
            })
          );
          if (!includedResult.every((v) => _isSubject(v))) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; values of @included must expand to node objects.",
              "jsonld.SyntaxError",
              { code: "invalid @included value", value }
            );
          }
          _addValue(expandedParent, "@included", includedResult, {
            propertyIsArray: true,
          });
          continue;
        }
        if (
          expandedProperty === "@graph" &&
          !(_isObject(value) || _isArray(value))
        ) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; "@graph" value must not be an object or an array.',
            "jsonld.SyntaxError",
            { code: "invalid @graph value", value }
          );
        }
        if (expandedProperty === "@value") {
          unexpandedValue = value;
          if (isJsonType && _processingMode(activeCtx, 1.1)) {
            expandedParent["@value"] = value;
          } else {
            _addValue(expandedParent, "@value", value, {
              propertyIsArray: options.isFrame,
            });
          }
          continue;
        }
        if (expandedProperty === "@language") {
          if (value === null) {
            continue;
          }
          if (!_isString(value) && !options.isFrame) {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; "@language" value must be a string.',
              "jsonld.SyntaxError",
              { code: "invalid language-tagged string", value }
            );
          }
          value = _asArray(value).map((v) =>
            _isString(v) ? v.toLowerCase() : v
          );
          for (const language of value) {
            if (_isString(language) && !language.match(REGEX_BCP47)) {
              if (options.eventHandler) {
                _handleEvent({
                  event: {
                    type: ["JsonLdEvent"],
                    code: "invalid @language value",
                    level: "warning",
                    message: "@language value must be valid BCP47.",
                    details: {
                      language,
                    },
                  },
                  options,
                });
              }
            }
          }
          _addValue(expandedParent, "@language", value, {
            propertyIsArray: options.isFrame,
          });
          continue;
        }
        if (expandedProperty === "@direction") {
          if (!_isString(value) && !options.isFrame) {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; "@direction" value must be a string.',
              "jsonld.SyntaxError",
              { code: "invalid base direction", value }
            );
          }
          value = _asArray(value);
          for (const dir of value) {
            if (_isString(dir) && dir !== "ltr" && dir !== "rtl") {
              throw new JsonLdError(
                'Invalid JSON-LD syntax; "@direction" must be "ltr" or "rtl".',
                "jsonld.SyntaxError",
                { code: "invalid base direction", value }
              );
            }
          }
          _addValue(expandedParent, "@direction", value, {
            propertyIsArray: options.isFrame,
          });
          continue;
        }
        if (expandedProperty === "@index") {
          if (!_isString(value)) {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; "@index" value must be a string.',
              "jsonld.SyntaxError",
              { code: "invalid @index value", value }
            );
          }
          _addValue(expandedParent, "@index", value);
          continue;
        }
        if (expandedProperty === "@reverse") {
          if (!_isObject(value)) {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; "@reverse" value must be an object.',
              "jsonld.SyntaxError",
              { code: "invalid @reverse value", value }
            );
          }
          expandedValue = await api.expand({
            activeCtx,
            activeProperty: "@reverse",
            element: value,
            options,
          });
          if ("@reverse" in expandedValue) {
            for (const property in expandedValue["@reverse"]) {
              _addValue(
                expandedParent,
                property,
                expandedValue["@reverse"][property],
                { propertyIsArray: true }
              );
            }
          }
          let reverseMap = expandedParent["@reverse"] || null;
          for (const property in expandedValue) {
            if (property === "@reverse") {
              continue;
            }
            if (reverseMap === null) {
              reverseMap = expandedParent["@reverse"] = {};
            }
            _addValue(reverseMap, property, [], { propertyIsArray: true });
            const items = expandedValue[property];
            for (let ii = 0; ii < items.length; ++ii) {
              const item = items[ii];
              if (_isValue(item) || _isList(item)) {
                throw new JsonLdError(
                  'Invalid JSON-LD syntax; "@reverse" value must not be a @value or an @list.',
                  "jsonld.SyntaxError",
                  {
                    code: "invalid reverse property value",
                    value: expandedValue,
                  }
                );
              }
              _addValue(reverseMap, property, item, { propertyIsArray: true });
            }
          }
          continue;
        }
        if (expandedProperty === "@nest") {
          nests.push(key);
          continue;
        }
        let termCtx = activeCtx;
        const ctx = _getContextValue(activeCtx, key, "@context");
        if (!_isUndefined(ctx)) {
          termCtx = await _processContext({
            activeCtx,
            localCtx: ctx,
            propagate: true,
            overrideProtected: true,
            options,
          });
        }
        const container = _getContextValue(termCtx, key, "@container") || [];
        if (container.includes("@language") && _isObject(value)) {
          const direction = _getContextValue(termCtx, key, "@direction");
          expandedValue = _expandLanguageMap(
            termCtx,
            value,
            direction,
            options
          );
        } else if (container.includes("@index") && _isObject(value)) {
          const asGraph = container.includes("@graph");
          const indexKey = _getContextValue(termCtx, key, "@index") || "@index";
          const propertyIndex =
            indexKey !== "@index" &&
            _expandIri(activeCtx, indexKey, { vocab: true }, options);
          expandedValue = await _expandIndexMap({
            activeCtx: termCtx,
            options,
            activeProperty: key,
            value,
            asGraph,
            indexKey,
            propertyIndex,
          });
        } else if (container.includes("@id") && _isObject(value)) {
          const asGraph = container.includes("@graph");
          expandedValue = await _expandIndexMap({
            activeCtx: termCtx,
            options,
            activeProperty: key,
            value,
            asGraph,
            indexKey: "@id",
          });
        } else if (container.includes("@type") && _isObject(value)) {
          expandedValue = await _expandIndexMap({
            // since container is `@type`, revert type scoped context when expanding
            activeCtx: termCtx.revertToPreviousContext(),
            options,
            activeProperty: key,
            value,
            asGraph: false,
            indexKey: "@type",
          });
        } else {
          const isList = expandedProperty === "@list";
          if (isList || expandedProperty === "@set") {
            let nextActiveProperty = activeProperty;
            if (isList && expandedActiveProperty === "@graph") {
              nextActiveProperty = null;
            }
            expandedValue = await api.expand({
              activeCtx: termCtx,
              activeProperty: nextActiveProperty,
              element: value,
              options,
              insideList: isList,
            });
          } else if (_getContextValue(activeCtx, key, "@type") === "@json") {
            expandedValue = {
              "@type": "@json",
              "@value": value,
            };
          } else {
            expandedValue = await api.expand({
              activeCtx: termCtx,
              activeProperty: key,
              element: value,
              options,
              insideList: false,
            });
          }
        }
        if (expandedValue === null && expandedProperty !== "@value") {
          continue;
        }
        if (
          expandedProperty !== "@list" &&
          !_isList(expandedValue) &&
          container.includes("@list")
        ) {
          expandedValue = { "@list": _asArray(expandedValue) };
        }
        if (
          container.includes("@graph") &&
          !container.some((key2) => key2 === "@id" || key2 === "@index")
        ) {
          expandedValue = _asArray(expandedValue);
          const count = Object.keys(expandedValue[0]).length;
          if (
            !options.isFrame &&
            _dropUnsafeObject({
              value: expandedValue[0],
              count,
              options,
            }) === null
          ) {
            continue;
          }
          expandedValue = expandedValue.map((v) => ({ "@graph": _asArray(v) }));
        }
        if (termCtx.mappings.has(key) && termCtx.mappings.get(key).reverse) {
          const reverseMap = (expandedParent["@reverse"] =
            expandedParent["@reverse"] || {});
          expandedValue = _asArray(expandedValue);
          for (let ii = 0; ii < expandedValue.length; ++ii) {
            const item = expandedValue[ii];
            if (_isValue(item) || _isList(item)) {
              throw new JsonLdError(
                'Invalid JSON-LD syntax; "@reverse" value must not be a @value or an @list.',
                "jsonld.SyntaxError",
                { code: "invalid reverse property value", value: expandedValue }
              );
            }
            _addValue(reverseMap, expandedProperty, item, {
              propertyIsArray: true,
            });
          }
          continue;
        }
        _addValue(expandedParent, expandedProperty, expandedValue, {
          propertyIsArray: true,
        });
      }
      if ("@value" in expandedParent) {
        if (
          expandedParent["@type"] === "@json" &&
          _processingMode(activeCtx, 1.1)
        ) {
        } else if (
          (_isObject(unexpandedValue) || _isArray(unexpandedValue)) &&
          !options.isFrame
        ) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; "@value" value must not be an object or an array.',
            "jsonld.SyntaxError",
            { code: "invalid value object value", value: unexpandedValue }
          );
        }
      }
      for (const key of nests) {
        const nestedValues = _isArray(element[key])
          ? element[key]
          : [element[key]];
        for (const nv of nestedValues) {
          if (
            !_isObject(nv) ||
            Object.keys(nv).some(
              (k) =>
                _expandIri(activeCtx, k, { vocab: true }, options) === "@value"
            )
          ) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; nested value must be a node object.",
              "jsonld.SyntaxError",
              { code: "invalid @nest value", value: nv }
            );
          }
          await _expandObject({
            activeCtx,
            activeProperty,
            expandedActiveProperty,
            element: nv,
            expandedParent,
            options,
            insideList,
            typeScopedContext,
            typeKey,
          });
        }
      }
    }
    function _expandValue({ activeCtx, activeProperty, value, options }) {
      if (value === null || value === void 0) {
        return null;
      }
      const expandedProperty = _expandIri(
        activeCtx,
        activeProperty,
        { vocab: true },
        options
      );
      if (expandedProperty === "@id") {
        return _expandIri(activeCtx, value, { base: true }, options);
      } else if (expandedProperty === "@type") {
        return _expandIri(
          activeCtx,
          value,
          { vocab: true, base: true },
          { ...options, typeExpansion: true }
        );
      }
      const type = _getContextValue(activeCtx, activeProperty, "@type");
      if (
        (type === "@id" || expandedProperty === "@graph") &&
        _isString(value)
      ) {
        const expandedValue = _expandIri(
          activeCtx,
          value,
          { base: true },
          options
        );
        if (expandedValue === null && value.match(REGEX_KEYWORD)) {
          if (options.eventHandler) {
            _handleEvent({
              event: {
                type: ["JsonLdEvent"],
                code: "reserved @id value",
                level: "warning",
                message: "Reserved @id found.",
                details: {
                  id: activeProperty,
                },
              },
              options,
            });
          }
        }
        return { "@id": expandedValue };
      }
      if (type === "@vocab" && _isString(value)) {
        return {
          "@id": _expandIri(
            activeCtx,
            value,
            { vocab: true, base: true },
            options
          ),
        };
      }
      if (_isKeyword(expandedProperty)) {
        return value;
      }
      const rval = {};
      if (type && !["@id", "@vocab", "@none"].includes(type)) {
        rval["@type"] = type;
      } else if (_isString(value)) {
        const language = _getContextValue(
          activeCtx,
          activeProperty,
          "@language"
        );
        if (language !== null) {
          rval["@language"] = language;
        }
        const direction = _getContextValue(
          activeCtx,
          activeProperty,
          "@direction"
        );
        if (direction !== null) {
          rval["@direction"] = direction;
        }
      }
      if (!["boolean", "number", "string"].includes(typeof value)) {
        value = value.toString();
      }
      rval["@value"] = value;
      return rval;
    }
    function _expandLanguageMap(activeCtx, languageMap, direction, options) {
      const rval = [];
      const keys = Object.keys(languageMap).sort();
      for (const key of keys) {
        const expandedKey = _expandIri(
          activeCtx,
          key,
          { vocab: true },
          options
        );
        let val = languageMap[key];
        if (!_isArray(val)) {
          val = [val];
        }
        for (const item of val) {
          if (item === null) {
            continue;
          }
          if (!_isString(item)) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; language map values must be strings.",
              "jsonld.SyntaxError",
              { code: "invalid language map value", languageMap }
            );
          }
          const val2 = { "@value": item };
          if (expandedKey !== "@none") {
            if (!key.match(REGEX_BCP47)) {
              if (options.eventHandler) {
                _handleEvent({
                  event: {
                    type: ["JsonLdEvent"],
                    code: "invalid @language value",
                    level: "warning",
                    message: "@language value must be valid BCP47.",
                    details: {
                      language: key,
                    },
                  },
                  options,
                });
              }
            }
            val2["@language"] = key.toLowerCase();
          }
          if (direction) {
            val2["@direction"] = direction;
          }
          rval.push(val2);
        }
      }
      return rval;
    }
    async function _expandIndexMap({
      activeCtx,
      options,
      activeProperty,
      value,
      asGraph,
      indexKey,
      propertyIndex,
    }) {
      const rval = [];
      const keys = Object.keys(value).sort();
      const isTypeIndex = indexKey === "@type";
      for (let key of keys) {
        if (isTypeIndex) {
          const ctx = _getContextValue(activeCtx, key, "@context");
          if (!_isUndefined(ctx)) {
            activeCtx = await _processContext({
              activeCtx,
              localCtx: ctx,
              propagate: false,
              options,
            });
          }
        }
        let val = value[key];
        if (!_isArray(val)) {
          val = [val];
        }
        val = await api.expand({
          activeCtx,
          activeProperty,
          element: val,
          options,
          insideList: false,
          insideIndex: true,
        });
        let expandedKey;
        if (propertyIndex) {
          if (key === "@none") {
            expandedKey = "@none";
          } else {
            expandedKey = _expandValue({
              activeCtx,
              activeProperty: indexKey,
              value: key,
              options,
            });
          }
        } else {
          expandedKey = _expandIri(activeCtx, key, { vocab: true }, options);
        }
        if (indexKey === "@id") {
          key = _expandIri(activeCtx, key, { base: true }, options);
        } else if (isTypeIndex) {
          key = expandedKey;
        }
        for (let item of val) {
          if (asGraph && !_isGraph(item)) {
            item = { "@graph": [item] };
          }
          if (indexKey === "@type") {
            if (expandedKey === "@none") {
            } else if (item["@type"]) {
              item["@type"] = [key].concat(item["@type"]);
            } else {
              item["@type"] = [key];
            }
          } else if (
            _isValue(item) &&
            !["@language", "@type", "@index"].includes(indexKey)
          ) {
            throw new JsonLdError(
              `Invalid JSON-LD syntax; Attempt to add illegal key to value object: "${indexKey}".`,
              "jsonld.SyntaxError",
              { code: "invalid value object", value: item }
            );
          } else if (propertyIndex) {
            if (expandedKey !== "@none") {
              _addValue(item, propertyIndex, expandedKey, {
                propertyIsArray: true,
                prependValue: true,
              });
            }
          } else if (expandedKey !== "@none" && !(indexKey in item)) {
            item[indexKey] = key;
          }
          rval.push(item);
        }
      }
      return rval;
    }
  },
});
var require_nodeMap = __commonJS({
  "node_modules/jsonld/lib/nodeMap.js"(exports, module2) {
    "use strict";
    const { isKeyword } = require_context();
    const graphTypes = require_graphTypes();
    const types = require_types();
    const util = require_util();
    const JsonLdError = require_JsonLdError();
    const api = {};
    module2.exports = api;
    api.createMergedNodeMap = (input, options) => {
      options = options || {};
      const issuer = options.issuer || new util.IdentifierIssuer("_:b");
      const graphs = { "@default": {} };
      api.createNodeMap(input, graphs, "@default", issuer);
      return api.mergeNodeMaps(graphs);
    };
    api.createNodeMap = (input, graphs, graph, issuer, name2, list) => {
      if (types.isArray(input)) {
        for (const node of input) {
          api.createNodeMap(node, graphs, graph, issuer, void 0, list);
        }
        return;
      }
      if (!types.isObject(input)) {
        if (list) {
          list.push(input);
        }
        return;
      }
      if (graphTypes.isValue(input)) {
        if ("@type" in input) {
          let type = input["@type"];
          if (type.indexOf("_:") === 0) {
            input["@type"] = type = issuer.getId(type);
          }
        }
        if (list) {
          list.push(input);
        }
        return;
      } else if (list && graphTypes.isList(input)) {
        const _list = [];
        api.createNodeMap(input["@list"], graphs, graph, issuer, name2, _list);
        list.push({ "@list": _list });
        return;
      }
      if ("@type" in input) {
        const types2 = input["@type"];
        for (const type of types2) {
          if (type.indexOf("_:") === 0) {
            issuer.getId(type);
          }
        }
      }
      if (types.isUndefined(name2)) {
        name2 = graphTypes.isBlankNode(input)
          ? issuer.getId(input["@id"])
          : input["@id"];
      }
      if (list) {
        list.push({ "@id": name2 });
      }
      const subjects = graphs[graph];
      const subject = (subjects[name2] = subjects[name2] || {});
      subject["@id"] = name2;
      const properties = Object.keys(input).sort();
      for (let property of properties) {
        if (property === "@id") {
          continue;
        }
        if (property === "@reverse") {
          const referencedNode = { "@id": name2 };
          const reverseMap = input["@reverse"];
          for (const reverseProperty in reverseMap) {
            const items = reverseMap[reverseProperty];
            for (const item of items) {
              let itemName = item["@id"];
              if (graphTypes.isBlankNode(item)) {
                itemName = issuer.getId(itemName);
              }
              api.createNodeMap(item, graphs, graph, issuer, itemName);
              util.addValue(
                subjects[itemName],
                reverseProperty,
                referencedNode,
                { propertyIsArray: true, allowDuplicate: false }
              );
            }
          }
          continue;
        }
        if (property === "@graph") {
          if (!(name2 in graphs)) {
            graphs[name2] = {};
          }
          api.createNodeMap(input[property], graphs, name2, issuer);
          continue;
        }
        if (property === "@included") {
          api.createNodeMap(input[property], graphs, graph, issuer);
          continue;
        }
        if (property !== "@type" && isKeyword(property)) {
          if (
            property === "@index" &&
            property in subject &&
            (input[property] !== subject[property] ||
              input[property]["@id"] !== subject[property]["@id"])
          ) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; conflicting @index property detected.",
              "jsonld.SyntaxError",
              { code: "conflicting indexes", subject }
            );
          }
          subject[property] = input[property];
          continue;
        }
        const objects = input[property];
        if (property.indexOf("_:") === 0) {
          property = issuer.getId(property);
        }
        if (objects.length === 0) {
          util.addValue(subject, property, [], { propertyIsArray: true });
          continue;
        }
        for (let o of objects) {
          if (property === "@type") {
            o = o.indexOf("_:") === 0 ? issuer.getId(o) : o;
          }
          if (graphTypes.isSubject(o) || graphTypes.isSubjectReference(o)) {
            if ("@id" in o && !o["@id"]) {
              continue;
            }
            const id = graphTypes.isBlankNode(o)
              ? issuer.getId(o["@id"])
              : o["@id"];
            util.addValue(
              subject,
              property,
              { "@id": id },
              { propertyIsArray: true, allowDuplicate: false }
            );
            api.createNodeMap(o, graphs, graph, issuer, id);
          } else if (graphTypes.isValue(o)) {
            util.addValue(subject, property, o, {
              propertyIsArray: true,
              allowDuplicate: false,
            });
          } else if (graphTypes.isList(o)) {
            const _list = [];
            api.createNodeMap(o["@list"], graphs, graph, issuer, name2, _list);
            o = { "@list": _list };
            util.addValue(subject, property, o, {
              propertyIsArray: true,
              allowDuplicate: false,
            });
          } else {
            api.createNodeMap(o, graphs, graph, issuer, name2);
            util.addValue(subject, property, o, {
              propertyIsArray: true,
              allowDuplicate: false,
            });
          }
        }
      }
    };
    api.mergeNodeMapGraphs = (graphs) => {
      const merged = {};
      for (const name2 of Object.keys(graphs).sort()) {
        for (const id of Object.keys(graphs[name2]).sort()) {
          const node = graphs[name2][id];
          if (!(id in merged)) {
            merged[id] = { "@id": id };
          }
          const mergedNode = merged[id];
          for (const property of Object.keys(node).sort()) {
            if (isKeyword(property) && property !== "@type") {
              mergedNode[property] = util.clone(node[property]);
            } else {
              for (const value of node[property]) {
                util.addValue(mergedNode, property, util.clone(value), {
                  propertyIsArray: true,
                  allowDuplicate: false,
                });
              }
            }
          }
        }
      }
      return merged;
    };
    api.mergeNodeMaps = (graphs) => {
      const defaultGraph = graphs["@default"];
      const graphNames = Object.keys(graphs).sort();
      for (const graphName of graphNames) {
        if (graphName === "@default") {
          continue;
        }
        const nodeMap = graphs[graphName];
        let subject = defaultGraph[graphName];
        if (!subject) {
          defaultGraph[graphName] = subject = {
            "@id": graphName,
            "@graph": [],
          };
        } else if (!("@graph" in subject)) {
          subject["@graph"] = [];
        }
        const graph = subject["@graph"];
        for (const id of Object.keys(nodeMap).sort()) {
          const node = nodeMap[id];
          if (!graphTypes.isSubjectReference(node)) {
            graph.push(node);
          }
        }
      }
      return defaultGraph;
    };
  },
});
var require_flatten = __commonJS({
  "node_modules/jsonld/lib/flatten.js"(exports, module2) {
    "use strict";
    const { isSubjectReference: _isSubjectReference } = require_graphTypes();
    const { createMergedNodeMap: _createMergedNodeMap } = require_nodeMap();
    const api = {};
    module2.exports = api;
    api.flatten = (input) => {
      const defaultGraph = _createMergedNodeMap(input);
      const flattened = [];
      const keys = Object.keys(defaultGraph).sort();
      for (let ki = 0; ki < keys.length; ++ki) {
        const node = defaultGraph[keys[ki]];
        if (!_isSubjectReference(node)) {
          flattened.push(node);
        }
      }
      return flattened;
    };
  },
});
var require_fromRdf = __commonJS({
  "node_modules/jsonld/lib/fromRdf.js"(exports, module2) {
    "use strict";
    const JsonLdError = require_JsonLdError();
    const graphTypes = require_graphTypes();
    const types = require_types();
    const { REGEX_BCP47, addValue: _addValue } = require_util();
    const { handleEvent: _handleEvent } = require_events();
    const {
      // RDF,
      RDF_LIST,
      RDF_FIRST,
      RDF_REST,
      RDF_NIL,
      RDF_TYPE,
      // RDF_PLAIN_LITERAL,
      // RDF_XML_LITERAL,
      RDF_JSON_LITERAL,
      // RDF_OBJECT,
      // RDF_LANGSTRING,
      // XSD,
      XSD_BOOLEAN,
      XSD_DOUBLE,
      XSD_INTEGER,
      XSD_STRING,
    } = require_constants();
    const api = {};
    module2.exports = api;
    api.fromRDF = async (dataset, options) => {
      const defaultGraph = {};
      const graphMap = { "@default": defaultGraph };
      const referencedOnce = {};
      const {
        useRdfType = false,
        useNativeTypes = false,
        rdfDirection = null,
      } = options;
      for (const quad of dataset) {
        const name2 =
          quad.graph.termType === "DefaultGraph"
            ? "@default"
            : quad.graph.value;
        if (!(name2 in graphMap)) {
          graphMap[name2] = {};
        }
        if (name2 !== "@default" && !(name2 in defaultGraph)) {
          defaultGraph[name2] = { "@id": name2 };
        }
        const nodeMap = graphMap[name2];
        const s = quad.subject.value;
        const p = quad.predicate.value;
        const o = quad.object;
        if (!(s in nodeMap)) {
          nodeMap[s] = { "@id": s };
        }
        const node = nodeMap[s];
        const objectIsNode = o.termType.endsWith("Node");
        if (objectIsNode && !(o.value in nodeMap)) {
          nodeMap[o.value] = { "@id": o.value };
        }
        if (p === RDF_TYPE && !useRdfType && objectIsNode) {
          _addValue(node, "@type", o.value, { propertyIsArray: true });
          continue;
        }
        const value = _RDFToObject(o, useNativeTypes, rdfDirection, options);
        _addValue(node, p, value, { propertyIsArray: true });
        if (objectIsNode) {
          if (o.value === RDF_NIL) {
            const object = nodeMap[o.value];
            if (!("usages" in object)) {
              object.usages = [];
            }
            object.usages.push({
              node,
              property: p,
              value,
            });
          } else if (o.value in referencedOnce) {
            referencedOnce[o.value] = false;
          } else {
            referencedOnce[o.value] = {
              node,
              property: p,
              value,
            };
          }
        }
      }
      for (const name2 in graphMap) {
        const graphObject = graphMap[name2];
        if (!(RDF_NIL in graphObject)) {
          continue;
        }
        const nil = graphObject[RDF_NIL];
        if (!nil.usages) {
          continue;
        }
        for (let usage of nil.usages) {
          let node = usage.node;
          let property = usage.property;
          let head = usage.value;
          const list = [];
          const listNodes = [];
          let nodeKeyCount = Object.keys(node).length;
          while (
            property === RDF_REST &&
            types.isObject(referencedOnce[node["@id"]]) &&
            types.isArray(node[RDF_FIRST]) &&
            node[RDF_FIRST].length === 1 &&
            types.isArray(node[RDF_REST]) &&
            node[RDF_REST].length === 1 &&
            (nodeKeyCount === 3 ||
              (nodeKeyCount === 4 &&
                types.isArray(node["@type"]) &&
                node["@type"].length === 1 &&
                node["@type"][0] === RDF_LIST))
          ) {
            list.push(node[RDF_FIRST][0]);
            listNodes.push(node["@id"]);
            usage = referencedOnce[node["@id"]];
            node = usage.node;
            property = usage.property;
            head = usage.value;
            nodeKeyCount = Object.keys(node).length;
            if (!graphTypes.isBlankNode(node)) {
              break;
            }
          }
          delete head["@id"];
          head["@list"] = list.reverse();
          for (const listNode of listNodes) {
            delete graphObject[listNode];
          }
        }
        delete nil.usages;
      }
      const result = [];
      const subjects = Object.keys(defaultGraph).sort();
      for (const subject of subjects) {
        const node = defaultGraph[subject];
        if (subject in graphMap) {
          const graph = (node["@graph"] = []);
          const graphObject = graphMap[subject];
          const graphSubjects = Object.keys(graphObject).sort();
          for (const graphSubject of graphSubjects) {
            const node2 = graphObject[graphSubject];
            if (!graphTypes.isSubjectReference(node2)) {
              graph.push(node2);
            }
          }
        }
        if (!graphTypes.isSubjectReference(node)) {
          result.push(node);
        }
      }
      return result;
    };
    function _RDFToObject(o, useNativeTypes, rdfDirection, options) {
      if (o.termType.endsWith("Node")) {
        return { "@id": o.value };
      }
      const rval = { "@value": o.value };
      if (o.language) {
        if (!o.language.match(REGEX_BCP47)) {
          if (options.eventHandler) {
            _handleEvent({
              event: {
                type: ["JsonLdEvent"],
                code: "invalid @language value",
                level: "warning",
                message: "@language value must be valid BCP47.",
                details: {
                  language: o.language,
                },
              },
              options,
            });
          }
        }
        rval["@language"] = o.language;
      } else {
        let type = o.datatype.value;
        if (!type) {
          type = XSD_STRING;
        }
        if (type === RDF_JSON_LITERAL) {
          type = "@json";
          try {
            rval["@value"] = JSON.parse(rval["@value"]);
          } catch (e) {
            throw new JsonLdError(
              "JSON literal could not be parsed.",
              "jsonld.InvalidJsonLiteral",
              { code: "invalid JSON literal", value: rval["@value"], cause: e }
            );
          }
        }
        if (useNativeTypes) {
          if (type === XSD_BOOLEAN) {
            if (rval["@value"] === "true") {
              rval["@value"] = true;
            } else if (rval["@value"] === "false") {
              rval["@value"] = false;
            }
          } else if (types.isNumeric(rval["@value"])) {
            if (type === XSD_INTEGER) {
              const i = parseInt(rval["@value"], 10);
              if (i.toFixed(0) === rval["@value"]) {
                rval["@value"] = i;
              }
            } else if (type === XSD_DOUBLE) {
              rval["@value"] = parseFloat(rval["@value"]);
            }
          }
          if (
            ![XSD_BOOLEAN, XSD_INTEGER, XSD_DOUBLE, XSD_STRING].includes(type)
          ) {
            rval["@type"] = type;
          }
        } else if (
          rdfDirection === "i18n-datatype" &&
          type.startsWith("https://www.w3.org/ns/i18n#")
        ) {
          const [, language, direction] = type.split(/[#_]/);
          if (language.length > 0) {
            rval["@language"] = language;
            if (!language.match(REGEX_BCP47)) {
              if (options.eventHandler) {
                _handleEvent({
                  event: {
                    type: ["JsonLdEvent"],
                    code: "invalid @language value",
                    level: "warning",
                    message: "@language value must be valid BCP47.",
                    details: {
                      language,
                    },
                  },
                  options,
                });
              }
            }
          }
          rval["@direction"] = direction;
        } else if (type !== XSD_STRING) {
          rval["@type"] = type;
        }
      }
      return rval;
    }
  },
});
var require_canonicalize = __commonJS({
  "node_modules/canonicalize/lib/canonicalize.js"(exports, module2) {
    "use strict";
    module2.exports = function serialize(object) {
      if (
        object === null ||
        typeof object !== "object" ||
        object.toJSON != null
      ) {
        return JSON.stringify(object);
      }
      if (Array.isArray(object)) {
        return (
          "[" +
          object.reduce((t, cv, ci) => {
            const comma = ci === 0 ? "" : ",";
            const value = cv === void 0 || typeof cv === "symbol" ? null : cv;
            return t + comma + serialize(value);
          }, "") +
          "]"
        );
      }
      return (
        "{" +
        Object.keys(object)
          .sort()
          .reduce((t, cv, ci) => {
            if (object[cv] === void 0 || typeof object[cv] === "symbol") {
              return t;
            }
            const comma = t.length === 0 ? "" : ",";
            return t + comma + serialize(cv) + ":" + serialize(object[cv]);
          }, "") +
        "}"
      );
    };
  },
});
var require_toRdf = __commonJS({
  "node_modules/jsonld/lib/toRdf.js"(exports, module2) {
    "use strict";
    const { createNodeMap } = require_nodeMap();
    const { isKeyword } = require_context();
    const graphTypes = require_graphTypes();
    const jsonCanonicalize = require_canonicalize();
    const types = require_types();
    const util = require_util();
    const { handleEvent: _handleEvent } = require_events();
    const {
      // RDF,
      // RDF_LIST,
      RDF_FIRST,
      RDF_REST,
      RDF_NIL,
      RDF_TYPE,
      // RDF_PLAIN_LITERAL,
      // RDF_XML_LITERAL,
      RDF_JSON_LITERAL,
      // RDF_OBJECT,
      RDF_LANGSTRING,
      // XSD,
      XSD_BOOLEAN,
      XSD_DOUBLE,
      XSD_INTEGER,
      XSD_STRING,
    } = require_constants();
    const { isAbsolute: _isAbsoluteIri } = require_url();
    const api = {};
    module2.exports = api;
    api.toRDF = (input, options) => {
      const issuer = new util.IdentifierIssuer("_:b");
      const nodeMap = { "@default": {} };
      createNodeMap(input, nodeMap, "@default", issuer);
      const dataset = [];
      const graphNames = Object.keys(nodeMap).sort();
      for (const graphName of graphNames) {
        let graphTerm;
        if (graphName === "@default") {
          graphTerm = { termType: "DefaultGraph", value: "" };
        } else if (_isAbsoluteIri(graphName)) {
          if (graphName.startsWith("_:")) {
            graphTerm = { termType: "BlankNode" };
          } else {
            graphTerm = { termType: "NamedNode" };
          }
          graphTerm.value = graphName;
        } else {
          if (options.eventHandler) {
            _handleEvent({
              event: {
                type: ["JsonLdEvent"],
                code: "relative graph reference",
                level: "warning",
                message: "Relative graph reference found.",
                details: {
                  graph: graphName,
                },
              },
              options,
            });
          }
          continue;
        }
        _graphToRDF(dataset, nodeMap[graphName], graphTerm, issuer, options);
      }
      return dataset;
    };
    function _graphToRDF(dataset, graph, graphTerm, issuer, options) {
      const ids = Object.keys(graph).sort();
      for (const id of ids) {
        const node = graph[id];
        const properties = Object.keys(node).sort();
        for (let property of properties) {
          const items = node[property];
          if (property === "@type") {
            property = RDF_TYPE;
          } else if (isKeyword(property)) {
            continue;
          }
          for (const item of items) {
            const subject = {
              termType: id.startsWith("_:") ? "BlankNode" : "NamedNode",
              value: id,
            };
            if (!_isAbsoluteIri(id)) {
              if (options.eventHandler) {
                _handleEvent({
                  event: {
                    type: ["JsonLdEvent"],
                    code: "relative subject reference",
                    level: "warning",
                    message: "Relative subject reference found.",
                    details: {
                      subject: id,
                    },
                  },
                  options,
                });
              }
              continue;
            }
            const predicate = {
              termType: property.startsWith("_:") ? "BlankNode" : "NamedNode",
              value: property,
            };
            if (!_isAbsoluteIri(property)) {
              if (options.eventHandler) {
                _handleEvent({
                  event: {
                    type: ["JsonLdEvent"],
                    code: "relative predicate reference",
                    level: "warning",
                    message: "Relative predicate reference found.",
                    details: {
                      predicate: property,
                    },
                  },
                  options,
                });
              }
              continue;
            }
            if (
              predicate.termType === "BlankNode" &&
              !options.produceGeneralizedRdf
            ) {
              if (options.eventHandler) {
                _handleEvent({
                  event: {
                    type: ["JsonLdEvent"],
                    code: "blank node predicate",
                    level: "warning",
                    message: "Dropping blank node predicate.",
                    details: {
                      // FIXME: add better issuer API to get reverse mapping
                      property: issuer
                        .getOldIds()
                        .find((key) => issuer.getId(key) === property),
                    },
                  },
                  options,
                });
              }
              continue;
            }
            const object = _objectToRDF(
              item,
              issuer,
              dataset,
              graphTerm,
              options.rdfDirection,
              options
            );
            if (object) {
              dataset.push({
                subject,
                predicate,
                object,
                graph: graphTerm,
              });
            }
          }
        }
      }
    }
    function _listToRDF(
      list,
      issuer,
      dataset,
      graphTerm,
      rdfDirection,
      options
    ) {
      const first = { termType: "NamedNode", value: RDF_FIRST };
      const rest = { termType: "NamedNode", value: RDF_REST };
      const nil = { termType: "NamedNode", value: RDF_NIL };
      const last = list.pop();
      const result = last
        ? { termType: "BlankNode", value: issuer.getId() }
        : nil;
      let subject = result;
      for (const item of list) {
        const object = _objectToRDF(
          item,
          issuer,
          dataset,
          graphTerm,
          rdfDirection,
          options
        );
        const next = { termType: "BlankNode", value: issuer.getId() };
        dataset.push({
          subject,
          predicate: first,
          object,
          graph: graphTerm,
        });
        dataset.push({
          subject,
          predicate: rest,
          object: next,
          graph: graphTerm,
        });
        subject = next;
      }
      if (last) {
        const object = _objectToRDF(
          last,
          issuer,
          dataset,
          graphTerm,
          rdfDirection,
          options
        );
        dataset.push({
          subject,
          predicate: first,
          object,
          graph: graphTerm,
        });
        dataset.push({
          subject,
          predicate: rest,
          object: nil,
          graph: graphTerm,
        });
      }
      return result;
    }
    function _objectToRDF(
      item,
      issuer,
      dataset,
      graphTerm,
      rdfDirection,
      options
    ) {
      const object = {};
      if (graphTypes.isValue(item)) {
        object.termType = "Literal";
        object.value = void 0;
        object.datatype = {
          termType: "NamedNode",
        };
        let value = item["@value"];
        const datatype = item["@type"] || null;
        if (datatype === "@json") {
          object.value = jsonCanonicalize(value);
          object.datatype.value = RDF_JSON_LITERAL;
        } else if (types.isBoolean(value)) {
          object.value = value.toString();
          object.datatype.value = datatype || XSD_BOOLEAN;
        } else if (types.isDouble(value) || datatype === XSD_DOUBLE) {
          if (!types.isDouble(value)) {
            value = parseFloat(value);
          }
          object.value = value.toExponential(15).replace(/(\d)0*e\+?/, "$1E");
          object.datatype.value = datatype || XSD_DOUBLE;
        } else if (types.isNumber(value)) {
          object.value = value.toFixed(0);
          object.datatype.value = datatype || XSD_INTEGER;
        } else if (rdfDirection === "i18n-datatype" && "@direction" in item) {
          const datatype2 =
            "https://www.w3.org/ns/i18n#" +
            (item["@language"] || "") +
            `_${item["@direction"]}`;
          object.datatype.value = datatype2;
          object.value = value;
        } else if ("@language" in item) {
          object.value = value;
          object.datatype.value = datatype || RDF_LANGSTRING;
          object.language = item["@language"];
        } else {
          object.value = value;
          object.datatype.value = datatype || XSD_STRING;
        }
      } else if (graphTypes.isList(item)) {
        const _list = _listToRDF(
          item["@list"],
          issuer,
          dataset,
          graphTerm,
          rdfDirection,
          options
        );
        object.termType = _list.termType;
        object.value = _list.value;
      } else {
        const id = types.isObject(item) ? item["@id"] : item;
        object.termType = id.startsWith("_:") ? "BlankNode" : "NamedNode";
        object.value = id;
      }
      if (object.termType === "NamedNode" && !_isAbsoluteIri(object.value)) {
        if (options.eventHandler) {
          _handleEvent({
            event: {
              type: ["JsonLdEvent"],
              code: "relative object reference",
              level: "warning",
              message: "Relative object reference found.",
              details: {
                object: object.value,
              },
            },
            options,
          });
        }
        return null;
      }
      return object;
    }
  },
});
var require_frame = __commonJS({
  "node_modules/jsonld/lib/frame.js"(exports, module2) {
    "use strict";
    const { isKeyword } = require_context();
    const graphTypes = require_graphTypes();
    const types = require_types();
    const util = require_util();
    const url = require_url();
    const JsonLdError = require_JsonLdError();
    const {
      createNodeMap: _createNodeMap,
      mergeNodeMapGraphs: _mergeNodeMapGraphs,
    } = require_nodeMap();
    const api = {};
    module2.exports = api;
    api.frameMergedOrDefault = (input, frame2, options) => {
      const state = {
        options,
        embedded: false,
        graph: "@default",
        graphMap: { "@default": {} },
        subjectStack: [],
        link: {},
        bnodeMap: {},
      };
      const issuer = new util.IdentifierIssuer("_:b");
      _createNodeMap(input, state.graphMap, "@default", issuer);
      if (options.merged) {
        state.graphMap["@merged"] = _mergeNodeMapGraphs(state.graphMap);
        state.graph = "@merged";
      }
      state.subjects = state.graphMap[state.graph];
      const framed = [];
      api.frame(state, Object.keys(state.subjects).sort(), frame2, framed);
      if (options.pruneBlankNodeIdentifiers) {
        options.bnodesToClear = Object.keys(state.bnodeMap).filter(
          (id) => state.bnodeMap[id].length === 1
        );
      }
      options.link = {};
      return _cleanupPreserve(framed, options);
    };
    api.frame = (state, subjects, frame2, parent, property = null) => {
      _validateFrame(frame2);
      frame2 = frame2[0];
      const options = state.options;
      const flags = {
        embed: _getFrameFlag(frame2, options, "embed"),
        explicit: _getFrameFlag(frame2, options, "explicit"),
        requireAll: _getFrameFlag(frame2, options, "requireAll"),
      };
      if (!state.link.hasOwnProperty(state.graph)) {
        state.link[state.graph] = {};
      }
      const link = state.link[state.graph];
      const matches = _filterSubjects(state, subjects, frame2, flags);
      const ids = Object.keys(matches).sort();
      for (const id of ids) {
        const subject = matches[id];
        if (property === null) {
          state.uniqueEmbeds = { [state.graph]: {} };
        } else {
          state.uniqueEmbeds[state.graph] =
            state.uniqueEmbeds[state.graph] || {};
        }
        if (flags.embed === "@link" && id in link) {
          _addFrameOutput(parent, property, link[id]);
          continue;
        }
        const output = { "@id": id };
        if (id.indexOf("_:") === 0) {
          util.addValue(state.bnodeMap, id, output, { propertyIsArray: true });
        }
        link[id] = output;
        if (
          (flags.embed === "@first" || flags.embed === "@last") &&
          state.is11
        ) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; invalid value of @embed.",
            "jsonld.SyntaxError",
            { code: "invalid @embed value", frame: frame2 }
          );
        }
        if (
          !state.embedded &&
          state.uniqueEmbeds[state.graph].hasOwnProperty(id)
        ) {
          continue;
        }
        if (
          state.embedded &&
          (flags.embed === "@never" ||
            _createsCircularReference(subject, state.graph, state.subjectStack))
        ) {
          _addFrameOutput(parent, property, output);
          continue;
        }
        if (
          state.embedded &&
          (flags.embed == "@first" || flags.embed == "@once") &&
          state.uniqueEmbeds[state.graph].hasOwnProperty(id)
        ) {
          _addFrameOutput(parent, property, output);
          continue;
        }
        if (flags.embed === "@last") {
          if (id in state.uniqueEmbeds[state.graph]) {
            _removeEmbed(state, id);
          }
        }
        state.uniqueEmbeds[state.graph][id] = { parent, property };
        state.subjectStack.push({ subject, graph: state.graph });
        if (id in state.graphMap) {
          let recurse = false;
          let subframe = null;
          if (!("@graph" in frame2)) {
            recurse = state.graph !== "@merged";
            subframe = {};
          } else {
            subframe = frame2["@graph"][0];
            recurse = !(id === "@merged" || id === "@default");
            if (!types.isObject(subframe)) {
              subframe = {};
            }
          }
          if (recurse) {
            api.frame(
              { ...state, graph: id, embedded: false },
              Object.keys(state.graphMap[id]).sort(),
              [subframe],
              output,
              "@graph"
            );
          }
        }
        if ("@included" in frame2) {
          api.frame(
            { ...state, embedded: false },
            subjects,
            frame2["@included"],
            output,
            "@included"
          );
        }
        for (const prop of Object.keys(subject).sort()) {
          if (isKeyword(prop)) {
            output[prop] = util.clone(subject[prop]);
            if (prop === "@type") {
              for (const type of subject["@type"]) {
                if (type.indexOf("_:") === 0) {
                  util.addValue(state.bnodeMap, type, output, {
                    propertyIsArray: true,
                  });
                }
              }
            }
            continue;
          }
          if (flags.explicit && !(prop in frame2)) {
            continue;
          }
          for (const o of subject[prop]) {
            const subframe =
              prop in frame2 ? frame2[prop] : _createImplicitFrame(flags);
            if (graphTypes.isList(o)) {
              const subframe2 =
                frame2[prop] && frame2[prop][0] && frame2[prop][0]["@list"]
                  ? frame2[prop][0]["@list"]
                  : _createImplicitFrame(flags);
              const list = { "@list": [] };
              _addFrameOutput(output, prop, list);
              const src = o["@list"];
              for (const oo of src) {
                if (graphTypes.isSubjectReference(oo)) {
                  api.frame(
                    { ...state, embedded: true },
                    [oo["@id"]],
                    subframe2,
                    list,
                    "@list"
                  );
                } else {
                  _addFrameOutput(list, "@list", util.clone(oo));
                }
              }
            } else if (graphTypes.isSubjectReference(o)) {
              api.frame(
                { ...state, embedded: true },
                [o["@id"]],
                subframe,
                output,
                prop
              );
            } else if (_valueMatch(subframe[0], o)) {
              _addFrameOutput(output, prop, util.clone(o));
            }
          }
        }
        for (const prop of Object.keys(frame2).sort()) {
          if (prop === "@type") {
            if (
              !types.isObject(frame2[prop][0]) ||
              !("@default" in frame2[prop][0])
            ) {
              continue;
            }
          } else if (isKeyword(prop)) {
            continue;
          }
          const next = frame2[prop][0] || {};
          const omitDefaultOn = _getFrameFlag(next, options, "omitDefault");
          if (!omitDefaultOn && !(prop in output)) {
            let preserve = "@null";
            if ("@default" in next) {
              preserve = util.clone(next["@default"]);
            }
            if (!types.isArray(preserve)) {
              preserve = [preserve];
            }
            output[prop] = [{ "@preserve": preserve }];
          }
        }
        for (const reverseProp of Object.keys(
          frame2["@reverse"] || {}
        ).sort()) {
          const subframe = frame2["@reverse"][reverseProp];
          for (const subject2 of Object.keys(state.subjects)) {
            const nodeValues = util.getValues(
              state.subjects[subject2],
              reverseProp
            );
            if (nodeValues.some((v) => v["@id"] === id)) {
              output["@reverse"] = output["@reverse"] || {};
              util.addValue(output["@reverse"], reverseProp, [], {
                propertyIsArray: true,
              });
              api.frame(
                { ...state, embedded: true },
                [subject2],
                subframe,
                output["@reverse"][reverseProp],
                property
              );
            }
          }
        }
        _addFrameOutput(parent, property, output);
        state.subjectStack.pop();
      }
    };
    api.cleanupNull = (input, options) => {
      if (types.isArray(input)) {
        const noNulls = input.map((v) => api.cleanupNull(v, options));
        return noNulls.filter((v) => v);
      }
      if (input === "@null") {
        return null;
      }
      if (types.isObject(input)) {
        if ("@id" in input) {
          const id = input["@id"];
          if (options.link.hasOwnProperty(id)) {
            const idx = options.link[id].indexOf(input);
            if (idx !== -1) {
              return options.link[id][idx];
            }
            options.link[id].push(input);
          } else {
            options.link[id] = [input];
          }
        }
        for (const key in input) {
          input[key] = api.cleanupNull(input[key], options);
        }
      }
      return input;
    };
    function _createImplicitFrame(flags) {
      const frame2 = {};
      for (const key in flags) {
        if (flags[key] !== void 0) {
          frame2["@" + key] = [flags[key]];
        }
      }
      return [frame2];
    }
    function _createsCircularReference(subjectToEmbed, graph, subjectStack) {
      for (let i = subjectStack.length - 1; i >= 0; --i) {
        const subject = subjectStack[i];
        if (
          subject.graph === graph &&
          subject.subject["@id"] === subjectToEmbed["@id"]
        ) {
          return true;
        }
      }
      return false;
    }
    function _getFrameFlag(frame2, options, name2) {
      const flag = "@" + name2;
      let rval = flag in frame2 ? frame2[flag][0] : options[name2];
      if (name2 === "embed") {
        if (rval === true) {
          rval = "@once";
        } else if (rval === false) {
          rval = "@never";
        } else if (
          rval !== "@always" &&
          rval !== "@never" &&
          rval !== "@link" &&
          rval !== "@first" &&
          rval !== "@last" &&
          rval !== "@once"
        ) {
          throw new JsonLdError(
            "Invalid JSON-LD syntax; invalid value of @embed.",
            "jsonld.SyntaxError",
            { code: "invalid @embed value", frame: frame2 }
          );
        }
      }
      return rval;
    }
    function _validateFrame(frame2) {
      if (
        !types.isArray(frame2) ||
        frame2.length !== 1 ||
        !types.isObject(frame2[0])
      ) {
        throw new JsonLdError(
          "Invalid JSON-LD syntax; a JSON-LD frame must be a single object.",
          "jsonld.SyntaxError",
          { frame: frame2 }
        );
      }
      if ("@id" in frame2[0]) {
        for (const id of util.asArray(frame2[0]["@id"])) {
          if (
            !(types.isObject(id) || url.isAbsolute(id)) ||
            (types.isString(id) && id.indexOf("_:") === 0)
          ) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; invalid @id in frame.",
              "jsonld.SyntaxError",
              { code: "invalid frame", frame: frame2 }
            );
          }
        }
      }
      if ("@type" in frame2[0]) {
        for (const type of util.asArray(frame2[0]["@type"])) {
          if (
            !(
              types.isObject(type) ||
              url.isAbsolute(type) ||
              type === "@json"
            ) ||
            (types.isString(type) && type.indexOf("_:") === 0)
          ) {
            throw new JsonLdError(
              "Invalid JSON-LD syntax; invalid @type in frame.",
              "jsonld.SyntaxError",
              { code: "invalid frame", frame: frame2 }
            );
          }
        }
      }
    }
    function _filterSubjects(state, subjects, frame2, flags) {
      const rval = {};
      for (const id of subjects) {
        const subject = state.graphMap[state.graph][id];
        if (_filterSubject(state, subject, frame2, flags)) {
          rval[id] = subject;
        }
      }
      return rval;
    }
    function _filterSubject(state, subject, frame2, flags) {
      let wildcard = true;
      let matchesSome = false;
      for (const key in frame2) {
        let matchThis = false;
        const nodeValues = util.getValues(subject, key);
        const isEmpty = util.getValues(frame2, key).length === 0;
        if (key === "@id") {
          if (types.isEmptyObject(frame2["@id"][0] || {})) {
            matchThis = true;
          } else if (frame2["@id"].length >= 0) {
            matchThis = frame2["@id"].includes(nodeValues[0]);
          }
          if (!flags.requireAll) {
            return matchThis;
          }
        } else if (key === "@type") {
          wildcard = false;
          if (isEmpty) {
            if (nodeValues.length > 0) {
              return false;
            }
            matchThis = true;
          } else if (
            frame2["@type"].length === 1 &&
            types.isEmptyObject(frame2["@type"][0])
          ) {
            matchThis = nodeValues.length > 0;
          } else {
            for (const type of frame2["@type"]) {
              if (types.isObject(type) && "@default" in type) {
                matchThis = true;
              } else {
                matchThis = matchThis || nodeValues.some((tt) => tt === type);
              }
            }
          }
          if (!flags.requireAll) {
            return matchThis;
          }
        } else if (isKeyword(key)) {
          continue;
        } else {
          const thisFrame = util.getValues(frame2, key)[0];
          let hasDefault = false;
          if (thisFrame) {
            _validateFrame([thisFrame]);
            hasDefault = "@default" in thisFrame;
          }
          wildcard = false;
          if (nodeValues.length === 0 && hasDefault) {
            continue;
          }
          if (nodeValues.length > 0 && isEmpty) {
            return false;
          }
          if (thisFrame === void 0) {
            if (nodeValues.length > 0) {
              return false;
            }
            matchThis = true;
          } else {
            if (graphTypes.isList(thisFrame)) {
              const listValue = thisFrame["@list"][0];
              if (graphTypes.isList(nodeValues[0])) {
                const nodeListValues = nodeValues[0]["@list"];
                if (graphTypes.isValue(listValue)) {
                  matchThis = nodeListValues.some((lv) =>
                    _valueMatch(listValue, lv)
                  );
                } else if (
                  graphTypes.isSubject(listValue) ||
                  graphTypes.isSubjectReference(listValue)
                ) {
                  matchThis = nodeListValues.some((lv) =>
                    _nodeMatch(state, listValue, lv, flags)
                  );
                }
              }
            } else if (graphTypes.isValue(thisFrame)) {
              matchThis = nodeValues.some((nv) => _valueMatch(thisFrame, nv));
            } else if (graphTypes.isSubjectReference(thisFrame)) {
              matchThis = nodeValues.some((nv) =>
                _nodeMatch(state, thisFrame, nv, flags)
              );
            } else if (types.isObject(thisFrame)) {
              matchThis = nodeValues.length > 0;
            } else {
              matchThis = false;
            }
          }
        }
        if (!matchThis && flags.requireAll) {
          return false;
        }
        matchesSome = matchesSome || matchThis;
      }
      return wildcard || matchesSome;
    }
    function _removeEmbed(state, id) {
      const embeds = state.uniqueEmbeds[state.graph];
      const embed = embeds[id];
      const parent = embed.parent;
      const property = embed.property;
      const subject = { "@id": id };
      if (types.isArray(parent)) {
        for (let i = 0; i < parent.length; ++i) {
          if (util.compareValues(parent[i], subject)) {
            parent[i] = subject;
            break;
          }
        }
      } else {
        const useArray = types.isArray(parent[property]);
        util.removeValue(parent, property, subject, {
          propertyIsArray: useArray,
        });
        util.addValue(parent, property, subject, { propertyIsArray: useArray });
      }
      const removeDependents = (id2) => {
        const ids = Object.keys(embeds);
        for (const next of ids) {
          if (
            next in embeds &&
            types.isObject(embeds[next].parent) &&
            embeds[next].parent["@id"] === id2
          ) {
            delete embeds[next];
            removeDependents(next);
          }
        }
      };
      removeDependents(id);
    }
    function _cleanupPreserve(input, options) {
      if (types.isArray(input)) {
        return input.map((value) => _cleanupPreserve(value, options));
      }
      if (types.isObject(input)) {
        if ("@preserve" in input) {
          return input["@preserve"][0];
        }
        if (graphTypes.isValue(input)) {
          return input;
        }
        if (graphTypes.isList(input)) {
          input["@list"] = _cleanupPreserve(input["@list"], options);
          return input;
        }
        if ("@id" in input) {
          const id = input["@id"];
          if (options.link.hasOwnProperty(id)) {
            const idx = options.link[id].indexOf(input);
            if (idx !== -1) {
              return options.link[id][idx];
            }
            options.link[id].push(input);
          } else {
            options.link[id] = [input];
          }
        }
        for (const prop in input) {
          if (prop === "@id" && options.bnodesToClear.includes(input[prop])) {
            delete input["@id"];
            continue;
          }
          input[prop] = _cleanupPreserve(input[prop], options);
        }
      }
      return input;
    }
    function _addFrameOutput(parent, property, output) {
      if (types.isObject(parent)) {
        util.addValue(parent, property, output, { propertyIsArray: true });
      } else {
        parent.push(output);
      }
    }
    function _nodeMatch(state, pattern, value, flags) {
      if (!("@id" in value)) {
        return false;
      }
      const nodeObject = state.subjects[value["@id"]];
      return nodeObject && _filterSubject(state, nodeObject, pattern, flags);
    }
    function _valueMatch(pattern, value) {
      const v1 = value["@value"];
      const t1 = value["@type"];
      const l1 = value["@language"];
      const v2 = pattern["@value"]
        ? types.isArray(pattern["@value"])
          ? pattern["@value"]
          : [pattern["@value"]]
        : [];
      const t2 = pattern["@type"]
        ? types.isArray(pattern["@type"])
          ? pattern["@type"]
          : [pattern["@type"]]
        : [];
      const l2 = pattern["@language"]
        ? types.isArray(pattern["@language"])
          ? pattern["@language"]
          : [pattern["@language"]]
        : [];
      if (v2.length === 0 && t2.length === 0 && l2.length === 0) {
        return true;
      }
      if (!(v2.includes(v1) || types.isEmptyObject(v2[0]))) {
        return false;
      }
      if (
        !(
          (!t1 && t2.length === 0) ||
          t2.includes(t1) ||
          (t1 && types.isEmptyObject(t2[0]))
        )
      ) {
        return false;
      }
      if (
        !(
          (!l1 && l2.length === 0) ||
          l2.includes(l1) ||
          (l1 && types.isEmptyObject(l2[0]))
        )
      ) {
        return false;
      }
      return true;
    }
  },
});
var require_compact = __commonJS({
  "node_modules/jsonld/lib/compact.js"(exports, module2) {
    "use strict";
    const JsonLdError = require_JsonLdError();
    const {
      isArray: _isArray,
      isObject: _isObject,
      isString: _isString,
      isUndefined: _isUndefined,
    } = require_types();
    const {
      isList: _isList,
      isValue: _isValue,
      isGraph: _isGraph,
      isSimpleGraph: _isSimpleGraph,
      isSubjectReference: _isSubjectReference,
    } = require_graphTypes();
    const {
      expandIri: _expandIri,
      getContextValue: _getContextValue,
      isKeyword: _isKeyword,
      process: _processContext,
      processingMode: _processingMode,
    } = require_context();
    const { removeBase: _removeBase, prependBase: _prependBase } =
      require_url();
    const {
      REGEX_KEYWORD,
      addValue: _addValue,
      asArray: _asArray,
      compareShortestLeast: _compareShortestLeast,
    } = require_util();
    const api = {};
    module2.exports = api;
    api.compact = async ({
      activeCtx,
      activeProperty = null,
      element,
      options = {},
    }) => {
      if (_isArray(element)) {
        let rval = [];
        for (let i = 0; i < element.length; ++i) {
          const compacted = await api.compact({
            activeCtx,
            activeProperty,
            element: element[i],
            options,
          });
          if (compacted === null) {
            continue;
          }
          rval.push(compacted);
        }
        if (options.compactArrays && rval.length === 1) {
          const container =
            _getContextValue(activeCtx, activeProperty, "@container") || [];
          if (container.length === 0) {
            rval = rval[0];
          }
        }
        return rval;
      }
      const ctx = _getContextValue(activeCtx, activeProperty, "@context");
      if (!_isUndefined(ctx)) {
        activeCtx = await _processContext({
          activeCtx,
          localCtx: ctx,
          propagate: true,
          overrideProtected: true,
          options,
        });
      }
      if (_isObject(element)) {
        if (
          options.link &&
          "@id" in element &&
          options.link.hasOwnProperty(element["@id"])
        ) {
          const linked = options.link[element["@id"]];
          for (let i = 0; i < linked.length; ++i) {
            if (linked[i].expanded === element) {
              return linked[i].compacted;
            }
          }
        }
        if (_isValue(element) || _isSubjectReference(element)) {
          const rval2 = api.compactValue({
            activeCtx,
            activeProperty,
            value: element,
            options,
          });
          if (options.link && _isSubjectReference(element)) {
            if (!options.link.hasOwnProperty(element["@id"])) {
              options.link[element["@id"]] = [];
            }
            options.link[element["@id"]].push({
              expanded: element,
              compacted: rval2,
            });
          }
          return rval2;
        }
        if (_isList(element)) {
          const container =
            _getContextValue(activeCtx, activeProperty, "@container") || [];
          if (container.includes("@list")) {
            return api.compact({
              activeCtx,
              activeProperty,
              element: element["@list"],
              options,
            });
          }
        }
        const insideReverse = activeProperty === "@reverse";
        const rval = {};
        const inputCtx = activeCtx;
        if (!_isValue(element) && !_isSubjectReference(element)) {
          activeCtx = activeCtx.revertToPreviousContext();
        }
        const propertyScopedCtx = _getContextValue(
          inputCtx,
          activeProperty,
          "@context"
        );
        if (!_isUndefined(propertyScopedCtx)) {
          activeCtx = await _processContext({
            activeCtx,
            localCtx: propertyScopedCtx,
            propagate: true,
            overrideProtected: true,
            options,
          });
        }
        if (options.link && "@id" in element) {
          if (!options.link.hasOwnProperty(element["@id"])) {
            options.link[element["@id"]] = [];
          }
          options.link[element["@id"]].push({
            expanded: element,
            compacted: rval,
          });
        }
        let types = element["@type"] || [];
        if (types.length > 1) {
          types = Array.from(types).sort();
        }
        const typeContext = activeCtx;
        for (const type of types) {
          const compactedType = api.compactIri({
            activeCtx: typeContext,
            iri: type,
            relativeTo: { vocab: true },
          });
          const ctx2 = _getContextValue(inputCtx, compactedType, "@context");
          if (!_isUndefined(ctx2)) {
            activeCtx = await _processContext({
              activeCtx,
              localCtx: ctx2,
              options,
              propagate: false,
            });
          }
        }
        const keys = Object.keys(element).sort();
        for (const expandedProperty of keys) {
          const expandedValue = element[expandedProperty];
          if (expandedProperty === "@id") {
            let compactedValue = _asArray(expandedValue).map((expandedIri) =>
              api.compactIri({
                activeCtx,
                iri: expandedIri,
                relativeTo: { vocab: false },
                base: options.base,
              })
            );
            if (compactedValue.length === 1) {
              compactedValue = compactedValue[0];
            }
            const alias = api.compactIri({
              activeCtx,
              iri: "@id",
              relativeTo: { vocab: true },
            });
            rval[alias] = compactedValue;
            continue;
          }
          if (expandedProperty === "@type") {
            let compactedValue = _asArray(expandedValue).map((expandedIri) =>
              api.compactIri({
                activeCtx: inputCtx,
                iri: expandedIri,
                relativeTo: { vocab: true },
              })
            );
            if (compactedValue.length === 1) {
              compactedValue = compactedValue[0];
            }
            const alias = api.compactIri({
              activeCtx,
              iri: "@type",
              relativeTo: { vocab: true },
            });
            const container =
              _getContextValue(activeCtx, alias, "@container") || [];
            const typeAsSet =
              container.includes("@set") && _processingMode(activeCtx, 1.1);
            const isArray =
              typeAsSet ||
              (_isArray(compactedValue) && expandedValue.length === 0);
            _addValue(rval, alias, compactedValue, {
              propertyIsArray: isArray,
            });
            continue;
          }
          if (expandedProperty === "@reverse") {
            const compactedValue = await api.compact({
              activeCtx,
              activeProperty: "@reverse",
              element: expandedValue,
              options,
            });
            for (const compactedProperty in compactedValue) {
              if (
                activeCtx.mappings.has(compactedProperty) &&
                activeCtx.mappings.get(compactedProperty).reverse
              ) {
                const value = compactedValue[compactedProperty];
                const container =
                  _getContextValue(
                    activeCtx,
                    compactedProperty,
                    "@container"
                  ) || [];
                const useArray =
                  container.includes("@set") || !options.compactArrays;
                _addValue(rval, compactedProperty, value, {
                  propertyIsArray: useArray,
                });
                delete compactedValue[compactedProperty];
              }
            }
            if (Object.keys(compactedValue).length > 0) {
              const alias = api.compactIri({
                activeCtx,
                iri: expandedProperty,
                relativeTo: { vocab: true },
              });
              _addValue(rval, alias, compactedValue);
            }
            continue;
          }
          if (expandedProperty === "@preserve") {
            const compactedValue = await api.compact({
              activeCtx,
              activeProperty,
              element: expandedValue,
              options,
            });
            if (!(_isArray(compactedValue) && compactedValue.length === 0)) {
              _addValue(rval, expandedProperty, compactedValue);
            }
            continue;
          }
          if (expandedProperty === "@index") {
            const container =
              _getContextValue(activeCtx, activeProperty, "@container") || [];
            if (container.includes("@index")) {
              continue;
            }
            const alias = api.compactIri({
              activeCtx,
              iri: expandedProperty,
              relativeTo: { vocab: true },
            });
            _addValue(rval, alias, expandedValue);
            continue;
          }
          if (
            expandedProperty !== "@graph" &&
            expandedProperty !== "@list" &&
            expandedProperty !== "@included" &&
            _isKeyword(expandedProperty)
          ) {
            const alias = api.compactIri({
              activeCtx,
              iri: expandedProperty,
              relativeTo: { vocab: true },
            });
            _addValue(rval, alias, expandedValue);
            continue;
          }
          if (!_isArray(expandedValue)) {
            throw new JsonLdError(
              "JSON-LD expansion error; expanded value must be an array.",
              "jsonld.SyntaxError"
            );
          }
          if (expandedValue.length === 0) {
            const itemActiveProperty = api.compactIri({
              activeCtx,
              iri: expandedProperty,
              value: expandedValue,
              relativeTo: { vocab: true },
              reverse: insideReverse,
            });
            const nestProperty = activeCtx.mappings.has(itemActiveProperty)
              ? activeCtx.mappings.get(itemActiveProperty)["@nest"]
              : null;
            let nestResult = rval;
            if (nestProperty) {
              _checkNestProperty(activeCtx, nestProperty, options);
              if (!_isObject(rval[nestProperty])) {
                rval[nestProperty] = {};
              }
              nestResult = rval[nestProperty];
            }
            _addValue(nestResult, itemActiveProperty, expandedValue, {
              propertyIsArray: true,
            });
          }
          for (const expandedItem of expandedValue) {
            const itemActiveProperty = api.compactIri({
              activeCtx,
              iri: expandedProperty,
              value: expandedItem,
              relativeTo: { vocab: true },
              reverse: insideReverse,
            });
            const nestProperty = activeCtx.mappings.has(itemActiveProperty)
              ? activeCtx.mappings.get(itemActiveProperty)["@nest"]
              : null;
            let nestResult = rval;
            if (nestProperty) {
              _checkNestProperty(activeCtx, nestProperty, options);
              if (!_isObject(rval[nestProperty])) {
                rval[nestProperty] = {};
              }
              nestResult = rval[nestProperty];
            }
            const container =
              _getContextValue(activeCtx, itemActiveProperty, "@container") ||
              [];
            const isGraph = _isGraph(expandedItem);
            const isList = _isList(expandedItem);
            let inner;
            if (isList) {
              inner = expandedItem["@list"];
            } else if (isGraph) {
              inner = expandedItem["@graph"];
            }
            let compactedItem = await api.compact({
              activeCtx,
              activeProperty: itemActiveProperty,
              element: isList || isGraph ? inner : expandedItem,
              options,
            });
            if (isList) {
              if (!_isArray(compactedItem)) {
                compactedItem = [compactedItem];
              }
              if (!container.includes("@list")) {
                compactedItem = {
                  [api.compactIri({
                    activeCtx,
                    iri: "@list",
                    relativeTo: { vocab: true },
                  })]: compactedItem,
                };
                if ("@index" in expandedItem) {
                  compactedItem[
                    api.compactIri({
                      activeCtx,
                      iri: "@index",
                      relativeTo: { vocab: true },
                    })
                  ] = expandedItem["@index"];
                }
              } else {
                _addValue(nestResult, itemActiveProperty, compactedItem, {
                  valueIsArray: true,
                  allowDuplicate: true,
                });
                continue;
              }
            }
            if (isGraph) {
              if (
                container.includes("@graph") &&
                (container.includes("@id") ||
                  (container.includes("@index") &&
                    _isSimpleGraph(expandedItem)))
              ) {
                let mapObject;
                if (nestResult.hasOwnProperty(itemActiveProperty)) {
                  mapObject = nestResult[itemActiveProperty];
                } else {
                  nestResult[itemActiveProperty] = mapObject = {};
                }
                const key =
                  (container.includes("@id")
                    ? expandedItem["@id"]
                    : expandedItem["@index"]) ||
                  api.compactIri({
                    activeCtx,
                    iri: "@none",
                    relativeTo: { vocab: true },
                  });
                _addValue(mapObject, key, compactedItem, {
                  propertyIsArray:
                    !options.compactArrays || container.includes("@set"),
                });
              } else if (
                container.includes("@graph") &&
                _isSimpleGraph(expandedItem)
              ) {
                if (_isArray(compactedItem) && compactedItem.length > 1) {
                  compactedItem = { "@included": compactedItem };
                }
                _addValue(nestResult, itemActiveProperty, compactedItem, {
                  propertyIsArray:
                    !options.compactArrays || container.includes("@set"),
                });
              } else {
                if (
                  _isArray(compactedItem) &&
                  compactedItem.length === 1 &&
                  options.compactArrays
                ) {
                  compactedItem = compactedItem[0];
                }
                compactedItem = {
                  [api.compactIri({
                    activeCtx,
                    iri: "@graph",
                    relativeTo: { vocab: true },
                  })]: compactedItem,
                };
                if ("@id" in expandedItem) {
                  compactedItem[
                    api.compactIri({
                      activeCtx,
                      iri: "@id",
                      relativeTo: { vocab: true },
                    })
                  ] = expandedItem["@id"];
                }
                if ("@index" in expandedItem) {
                  compactedItem[
                    api.compactIri({
                      activeCtx,
                      iri: "@index",
                      relativeTo: { vocab: true },
                    })
                  ] = expandedItem["@index"];
                }
                _addValue(nestResult, itemActiveProperty, compactedItem, {
                  propertyIsArray:
                    !options.compactArrays || container.includes("@set"),
                });
              }
            } else if (
              container.includes("@language") ||
              container.includes("@index") ||
              container.includes("@id") ||
              container.includes("@type")
            ) {
              let mapObject;
              if (nestResult.hasOwnProperty(itemActiveProperty)) {
                mapObject = nestResult[itemActiveProperty];
              } else {
                nestResult[itemActiveProperty] = mapObject = {};
              }
              let key;
              if (container.includes("@language")) {
                if (_isValue(compactedItem)) {
                  compactedItem = compactedItem["@value"];
                }
                key = expandedItem["@language"];
              } else if (container.includes("@index")) {
                const indexKey =
                  _getContextValue(activeCtx, itemActiveProperty, "@index") ||
                  "@index";
                const containerKey = api.compactIri({
                  activeCtx,
                  iri: indexKey,
                  relativeTo: { vocab: true },
                });
                if (indexKey === "@index") {
                  key = expandedItem["@index"];
                  delete compactedItem[containerKey];
                } else {
                  let others;
                  [key, ...others] = _asArray(compactedItem[indexKey] || []);
                  if (!_isString(key)) {
                    key = null;
                  } else {
                    switch (others.length) {
                      case 0:
                        delete compactedItem[indexKey];
                        break;
                      case 1:
                        compactedItem[indexKey] = others[0];
                        break;
                      default:
                        compactedItem[indexKey] = others;
                        break;
                    }
                  }
                }
              } else if (container.includes("@id")) {
                const idKey = api.compactIri({
                  activeCtx,
                  iri: "@id",
                  relativeTo: { vocab: true },
                });
                key = compactedItem[idKey];
                delete compactedItem[idKey];
              } else if (container.includes("@type")) {
                const typeKey = api.compactIri({
                  activeCtx,
                  iri: "@type",
                  relativeTo: { vocab: true },
                });
                let types2;
                [key, ...types2] = _asArray(compactedItem[typeKey] || []);
                switch (types2.length) {
                  case 0:
                    delete compactedItem[typeKey];
                    break;
                  case 1:
                    compactedItem[typeKey] = types2[0];
                    break;
                  default:
                    compactedItem[typeKey] = types2;
                    break;
                }
                if (
                  Object.keys(compactedItem).length === 1 &&
                  "@id" in expandedItem
                ) {
                  compactedItem = await api.compact({
                    activeCtx,
                    activeProperty: itemActiveProperty,
                    element: { "@id": expandedItem["@id"] },
                    options,
                  });
                }
              }
              if (!key) {
                key = api.compactIri({
                  activeCtx,
                  iri: "@none",
                  relativeTo: { vocab: true },
                });
              }
              _addValue(mapObject, key, compactedItem, {
                propertyIsArray: container.includes("@set"),
              });
            } else {
              const isArray =
                !options.compactArrays ||
                container.includes("@set") ||
                container.includes("@list") ||
                (_isArray(compactedItem) && compactedItem.length === 0) ||
                expandedProperty === "@list" ||
                expandedProperty === "@graph";
              _addValue(nestResult, itemActiveProperty, compactedItem, {
                propertyIsArray: isArray,
              });
            }
          }
        }
        return rval;
      }
      return element;
    };
    api.compactIri = ({
      activeCtx,
      iri,
      value = null,
      relativeTo = { vocab: false },
      reverse = false,
      base = null,
    }) => {
      if (iri === null) {
        return iri;
      }
      if (activeCtx.isPropertyTermScoped && activeCtx.previousContext) {
        activeCtx = activeCtx.previousContext;
      }
      const inverseCtx = activeCtx.getInverse();
      if (
        _isKeyword(iri) &&
        iri in inverseCtx &&
        "@none" in inverseCtx[iri] &&
        "@type" in inverseCtx[iri]["@none"] &&
        "@none" in inverseCtx[iri]["@none"]["@type"]
      ) {
        return inverseCtx[iri]["@none"]["@type"]["@none"];
      }
      if (relativeTo.vocab && iri in inverseCtx) {
        const defaultLanguage = activeCtx["@language"] || "@none";
        const containers = [];
        if (_isObject(value) && "@index" in value && !("@graph" in value)) {
          containers.push("@index", "@index@set");
        }
        if (_isObject(value) && "@preserve" in value) {
          value = value["@preserve"][0];
        }
        if (_isGraph(value)) {
          if ("@index" in value) {
            containers.push(
              "@graph@index",
              "@graph@index@set",
              "@index",
              "@index@set"
            );
          }
          if ("@id" in value) {
            containers.push("@graph@id", "@graph@id@set");
          }
          containers.push("@graph", "@graph@set", "@set");
          if (!("@index" in value)) {
            containers.push(
              "@graph@index",
              "@graph@index@set",
              "@index",
              "@index@set"
            );
          }
          if (!("@id" in value)) {
            containers.push("@graph@id", "@graph@id@set");
          }
        } else if (_isObject(value) && !_isValue(value)) {
          containers.push("@id", "@id@set", "@type", "@set@type");
        }
        let typeOrLanguage = "@language";
        let typeOrLanguageValue = "@null";
        if (reverse) {
          typeOrLanguage = "@type";
          typeOrLanguageValue = "@reverse";
          containers.push("@set");
        } else if (_isList(value)) {
          if (!("@index" in value)) {
            containers.push("@list");
          }
          const list = value["@list"];
          if (list.length === 0) {
            typeOrLanguage = "@any";
            typeOrLanguageValue = "@none";
          } else {
            let commonLanguage = list.length === 0 ? defaultLanguage : null;
            let commonType = null;
            for (let i = 0; i < list.length; ++i) {
              const item = list[i];
              let itemLanguage = "@none";
              let itemType = "@none";
              if (_isValue(item)) {
                if ("@direction" in item) {
                  const lang = (item["@language"] || "").toLowerCase();
                  const dir = item["@direction"];
                  itemLanguage = `${lang}_${dir}`;
                } else if ("@language" in item) {
                  itemLanguage = item["@language"].toLowerCase();
                } else if ("@type" in item) {
                  itemType = item["@type"];
                } else {
                  itemLanguage = "@null";
                }
              } else {
                itemType = "@id";
              }
              if (commonLanguage === null) {
                commonLanguage = itemLanguage;
              } else if (itemLanguage !== commonLanguage && _isValue(item)) {
                commonLanguage = "@none";
              }
              if (commonType === null) {
                commonType = itemType;
              } else if (itemType !== commonType) {
                commonType = "@none";
              }
              if (commonLanguage === "@none" && commonType === "@none") {
                break;
              }
            }
            commonLanguage = commonLanguage || "@none";
            commonType = commonType || "@none";
            if (commonType !== "@none") {
              typeOrLanguage = "@type";
              typeOrLanguageValue = commonType;
            } else {
              typeOrLanguageValue = commonLanguage;
            }
          }
        } else {
          if (_isValue(value)) {
            if ("@language" in value && !("@index" in value)) {
              containers.push("@language", "@language@set");
              typeOrLanguageValue = value["@language"];
              const dir = value["@direction"];
              if (dir) {
                typeOrLanguageValue = `${typeOrLanguageValue}_${dir}`;
              }
            } else if ("@direction" in value && !("@index" in value)) {
              typeOrLanguageValue = `_${value["@direction"]}`;
            } else if ("@type" in value) {
              typeOrLanguage = "@type";
              typeOrLanguageValue = value["@type"];
            }
          } else {
            typeOrLanguage = "@type";
            typeOrLanguageValue = "@id";
          }
          containers.push("@set");
        }
        containers.push("@none");
        if (_isObject(value) && !("@index" in value)) {
          containers.push("@index", "@index@set");
        }
        if (_isValue(value) && Object.keys(value).length === 1) {
          containers.push("@language", "@language@set");
        }
        const term = _selectTerm(
          activeCtx,
          iri,
          value,
          containers,
          typeOrLanguage,
          typeOrLanguageValue
        );
        if (term !== null) {
          return term;
        }
      }
      if (relativeTo.vocab) {
        if ("@vocab" in activeCtx) {
          const vocab = activeCtx["@vocab"];
          if (iri.indexOf(vocab) === 0 && iri !== vocab) {
            const suffix = iri.substr(vocab.length);
            if (!activeCtx.mappings.has(suffix)) {
              return suffix;
            }
          }
        }
      }
      let choice = null;
      const partialMatches = [];
      let iriMap = activeCtx.fastCurieMap;
      const maxPartialLength = iri.length - 1;
      for (let i = 0; i < maxPartialLength && iri[i] in iriMap; ++i) {
        iriMap = iriMap[iri[i]];
        if ("" in iriMap) {
          partialMatches.push(iriMap[""][0]);
        }
      }
      for (let i = partialMatches.length - 1; i >= 0; --i) {
        const entry = partialMatches[i];
        const terms = entry.terms;
        for (const term of terms) {
          const curie = term + ":" + iri.substr(entry.iri.length);
          const isUsableCurie =
            activeCtx.mappings.get(term)._prefix &&
            (!activeCtx.mappings.has(curie) ||
              (value === null && activeCtx.mappings.get(curie)["@id"] === iri));
          if (
            isUsableCurie &&
            (choice === null || _compareShortestLeast(curie, choice) < 0)
          ) {
            choice = curie;
          }
        }
      }
      if (choice !== null) {
        return choice;
      }
      for (const [term, td] of activeCtx.mappings) {
        if (td && td._prefix && iri.startsWith(term + ":")) {
          throw new JsonLdError(
            `Absolute IRI "${iri}" confused with prefix "${term}".`,
            "jsonld.SyntaxError",
            { code: "IRI confused with prefix", context: activeCtx }
          );
        }
      }
      if (!relativeTo.vocab) {
        if ("@base" in activeCtx) {
          if (!activeCtx["@base"]) {
            return iri;
          } else {
            const _iri = _removeBase(
              _prependBase(base, activeCtx["@base"]),
              iri
            );
            return REGEX_KEYWORD.test(_iri) ? `./${_iri}` : _iri;
          }
        } else {
          return _removeBase(base, iri);
        }
      }
      return iri;
    };
    api.compactValue = ({ activeCtx, activeProperty, value, options }) => {
      if (_isValue(value)) {
        const type2 = _getContextValue(activeCtx, activeProperty, "@type");
        const language = _getContextValue(
          activeCtx,
          activeProperty,
          "@language"
        );
        const direction = _getContextValue(
          activeCtx,
          activeProperty,
          "@direction"
        );
        const container =
          _getContextValue(activeCtx, activeProperty, "@container") || [];
        const preserveIndex =
          "@index" in value && !container.includes("@index");
        if (!preserveIndex && type2 !== "@none") {
          if (value["@type"] === type2) {
            return value["@value"];
          }
          if (
            "@language" in value &&
            value["@language"] === language &&
            "@direction" in value &&
            value["@direction"] === direction
          ) {
            return value["@value"];
          }
          if ("@language" in value && value["@language"] === language) {
            return value["@value"];
          }
          if ("@direction" in value && value["@direction"] === direction) {
            return value["@value"];
          }
        }
        const keyCount = Object.keys(value).length;
        const isValueOnlyKey =
          keyCount === 1 ||
          (keyCount === 2 && "@index" in value && !preserveIndex);
        const hasDefaultLanguage = "@language" in activeCtx;
        const isValueString = _isString(value["@value"]);
        const hasNullMapping =
          activeCtx.mappings.has(activeProperty) &&
          activeCtx.mappings.get(activeProperty)["@language"] === null;
        if (
          isValueOnlyKey &&
          type2 !== "@none" &&
          (!hasDefaultLanguage || !isValueString || hasNullMapping)
        ) {
          return value["@value"];
        }
        const rval = {};
        if (preserveIndex) {
          rval[
            api.compactIri({
              activeCtx,
              iri: "@index",
              relativeTo: { vocab: true },
            })
          ] = value["@index"];
        }
        if ("@type" in value) {
          rval[
            api.compactIri({
              activeCtx,
              iri: "@type",
              relativeTo: { vocab: true },
            })
          ] = api.compactIri({
            activeCtx,
            iri: value["@type"],
            relativeTo: { vocab: true },
          });
        } else if ("@language" in value) {
          rval[
            api.compactIri({
              activeCtx,
              iri: "@language",
              relativeTo: { vocab: true },
            })
          ] = value["@language"];
        }
        if ("@direction" in value) {
          rval[
            api.compactIri({
              activeCtx,
              iri: "@direction",
              relativeTo: { vocab: true },
            })
          ] = value["@direction"];
        }
        rval[
          api.compactIri({
            activeCtx,
            iri: "@value",
            relativeTo: { vocab: true },
          })
        ] = value["@value"];
        return rval;
      }
      const expandedProperty = _expandIri(
        activeCtx,
        activeProperty,
        { vocab: true },
        options
      );
      const type = _getContextValue(activeCtx, activeProperty, "@type");
      const compacted = api.compactIri({
        activeCtx,
        iri: value["@id"],
        relativeTo: { vocab: type === "@vocab" },
        base: options.base,
      });
      if (
        type === "@id" ||
        type === "@vocab" ||
        expandedProperty === "@graph"
      ) {
        return compacted;
      }
      return {
        [api.compactIri({
          activeCtx,
          iri: "@id",
          relativeTo: { vocab: true },
        })]: compacted,
      };
    };
    function _selectTerm(
      activeCtx,
      iri,
      value,
      containers,
      typeOrLanguage,
      typeOrLanguageValue
    ) {
      if (typeOrLanguageValue === null) {
        typeOrLanguageValue = "@null";
      }
      const prefs = [];
      if (
        (typeOrLanguageValue === "@id" || typeOrLanguageValue === "@reverse") &&
        _isObject(value) &&
        "@id" in value
      ) {
        if (typeOrLanguageValue === "@reverse") {
          prefs.push("@reverse");
        }
        const term = api.compactIri({
          activeCtx,
          iri: value["@id"],
          relativeTo: { vocab: true },
        });
        if (
          activeCtx.mappings.has(term) &&
          activeCtx.mappings.get(term) &&
          activeCtx.mappings.get(term)["@id"] === value["@id"]
        ) {
          prefs.push.apply(prefs, ["@vocab", "@id"]);
        } else {
          prefs.push.apply(prefs, ["@id", "@vocab"]);
        }
      } else {
        prefs.push(typeOrLanguageValue);
        const langDir = prefs.find((el) => el.includes("_"));
        if (langDir) {
          prefs.push(langDir.replace(/^[^_]+_/, "_"));
        }
      }
      prefs.push("@none");
      const containerMap = activeCtx.inverse[iri];
      for (const container of containers) {
        if (!(container in containerMap)) {
          continue;
        }
        const typeOrLanguageValueMap = containerMap[container][typeOrLanguage];
        for (const pref of prefs) {
          if (!(pref in typeOrLanguageValueMap)) {
            continue;
          }
          return typeOrLanguageValueMap[pref];
        }
      }
      return null;
    }
    function _checkNestProperty(activeCtx, nestProperty, options) {
      if (
        _expandIri(activeCtx, nestProperty, { vocab: true }, options) !==
        "@nest"
      ) {
        throw new JsonLdError(
          "JSON-LD compact error; nested property must have an @nest value resolving to @nest.",
          "jsonld.SyntaxError",
          { code: "invalid @nest value" }
        );
      }
    }
  },
});
var require_JsonLdProcessor = __commonJS({
  "node_modules/jsonld/lib/JsonLdProcessor.js"(exports, module2) {
    "use strict";
    module2.exports = (jsonld5) => {
      class JsonLdProcessor {
        toString() {
          return "[object JsonLdProcessor]";
        }
      }
      Object.defineProperty(JsonLdProcessor, "prototype", {
        writable: false,
        enumerable: false,
      });
      Object.defineProperty(JsonLdProcessor.prototype, "constructor", {
        writable: true,
        enumerable: false,
        configurable: true,
        value: JsonLdProcessor,
      });
      JsonLdProcessor.compact = function (input, ctx) {
        if (arguments.length < 2) {
          return Promise.reject(
            new TypeError("Could not compact, too few arguments.")
          );
        }
        return jsonld5.compact(input, ctx);
      };
      JsonLdProcessor.expand = function (input) {
        if (arguments.length < 1) {
          return Promise.reject(
            new TypeError("Could not expand, too few arguments.")
          );
        }
        return jsonld5.expand(input);
      };
      JsonLdProcessor.flatten = function (input) {
        if (arguments.length < 1) {
          return Promise.reject(
            new TypeError("Could not flatten, too few arguments.")
          );
        }
        return jsonld5.flatten(input);
      };
      return JsonLdProcessor;
    };
  },
});
var require_jsonld = __commonJS({
  "node_modules/jsonld/lib/jsonld.js"(exports, module2) {
    const canonize2 = require_rdf_canonize();
    const platform = require_platform();
    const util = require_util();
    const ContextResolver = require_ContextResolver();
    const IdentifierIssuer = util.IdentifierIssuer;
    const JsonLdError = require_JsonLdError();
    const LRU = require_lru_cache();
    const NQuads2 = require_NQuads2();
    const { expand: _expand } = require_expand();
    const { flatten: _flatten } = require_flatten();
    const { fromRDF: _fromRDF } = require_fromRdf();
    const { toRDF: _toRDF } = require_toRdf();
    const {
      frameMergedOrDefault: _frameMergedOrDefault,
      cleanupNull: _cleanupNull,
    } = require_frame();
    const {
      isArray: _isArray,
      isObject: _isObject,
      isString: _isString,
    } = require_types();
    const { isSubjectReference: _isSubjectReference } = require_graphTypes();
    const {
      expandIri: _expandIri,
      getInitialContext: _getInitialContext,
      process: _processContext,
      processingMode: _processingMode,
    } = require_context();
    const { compact: _compact, compactIri: _compactIri } = require_compact();
    const {
      createNodeMap: _createNodeMap,
      createMergedNodeMap: _createMergedNodeMap,
      mergeNodeMaps: _mergeNodeMaps,
    } = require_nodeMap();
    const {
      logEventHandler: _logEventHandler,
      logWarningEventHandler: _logWarningEventHandler,
      safeEventHandler: _safeEventHandler,
      setDefaultEventHandler: _setDefaultEventHandler,
      setupEventHandler: _setupEventHandler,
      strictEventHandler: _strictEventHandler,
      unhandledEventHandler: _unhandledEventHandler,
    } = require_events();
    const wrapper = function (jsonld5) {
      const _rdfParsers = {};
      const RESOLVED_CONTEXT_CACHE_MAX_SIZE = 100;
      const _resolvedContextCache = new LRU({
        max: RESOLVED_CONTEXT_CACHE_MAX_SIZE,
      });
      jsonld5.compact = async function (input, ctx, options) {
        if (arguments.length < 2) {
          throw new TypeError("Could not compact, too few arguments.");
        }
        if (ctx === null) {
          throw new JsonLdError(
            "The compaction context must not be null.",
            "jsonld.CompactError",
            { code: "invalid local context" }
          );
        }
        if (input === null) {
          return null;
        }
        options = _setDefaults(options, {
          base: _isString(input) ? input : "",
          compactArrays: true,
          compactToRelative: true,
          graph: false,
          skipExpansion: false,
          link: false,
          issuer: new IdentifierIssuer("_:b"),
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        if (options.link) {
          options.skipExpansion = true;
        }
        if (!options.compactToRelative) {
          delete options.base;
        }
        let expanded;
        if (options.skipExpansion) {
          expanded = input;
        } else {
          expanded = await jsonld5.expand(input, options);
        }
        const activeCtx = await jsonld5.processContext(
          _getInitialContext(options),
          ctx,
          options
        );
        let compacted = await _compact({
          activeCtx,
          element: expanded,
          options,
        });
        if (options.compactArrays && !options.graph && _isArray(compacted)) {
          if (compacted.length === 1) {
            compacted = compacted[0];
          } else if (compacted.length === 0) {
            compacted = {};
          }
        } else if (options.graph && _isObject(compacted)) {
          compacted = [compacted];
        }
        if (_isObject(ctx) && "@context" in ctx) {
          ctx = ctx["@context"];
        }
        ctx = util.clone(ctx);
        if (!_isArray(ctx)) {
          ctx = [ctx];
        }
        const tmp = ctx;
        ctx = [];
        for (let i = 0; i < tmp.length; ++i) {
          if (!_isObject(tmp[i]) || Object.keys(tmp[i]).length > 0) {
            ctx.push(tmp[i]);
          }
        }
        const hasContext = ctx.length > 0;
        if (ctx.length === 1) {
          ctx = ctx[0];
        }
        if (_isArray(compacted)) {
          const graphAlias = _compactIri({
            activeCtx,
            iri: "@graph",
            relativeTo: { vocab: true },
          });
          const graph = compacted;
          compacted = {};
          if (hasContext) {
            compacted["@context"] = ctx;
          }
          compacted[graphAlias] = graph;
        } else if (_isObject(compacted) && hasContext) {
          const graph = compacted;
          compacted = { "@context": ctx };
          for (const key in graph) {
            compacted[key] = graph[key];
          }
        }
        return compacted;
      };
      jsonld5.expand = async function (input, options) {
        if (arguments.length < 1) {
          throw new TypeError("Could not expand, too few arguments.");
        }
        options = _setDefaults(options, {
          keepFreeFloatingNodes: false,
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        const toResolve = {};
        const contextsToProcess = [];
        if ("expandContext" in options) {
          const expandContext = util.clone(options.expandContext);
          if (_isObject(expandContext) && "@context" in expandContext) {
            toResolve.expandContext = expandContext;
          } else {
            toResolve.expandContext = { "@context": expandContext };
          }
          contextsToProcess.push(toResolve.expandContext);
        }
        let defaultBase;
        if (!_isString(input)) {
          toResolve.input = util.clone(input);
        } else {
          const remoteDoc = await jsonld5.get(input, options);
          defaultBase = remoteDoc.documentUrl;
          toResolve.input = remoteDoc.document;
          if (remoteDoc.contextUrl) {
            toResolve.remoteContext = { "@context": remoteDoc.contextUrl };
            contextsToProcess.push(toResolve.remoteContext);
          }
        }
        if (!("base" in options)) {
          options.base = defaultBase || "";
        }
        let activeCtx = _getInitialContext(options);
        for (const localCtx of contextsToProcess) {
          activeCtx = await _processContext({ activeCtx, localCtx, options });
        }
        let expanded = await _expand({
          activeCtx,
          element: toResolve.input,
          options,
        });
        if (
          _isObject(expanded) &&
          "@graph" in expanded &&
          Object.keys(expanded).length === 1
        ) {
          expanded = expanded["@graph"];
        } else if (expanded === null) {
          expanded = [];
        }
        if (!_isArray(expanded)) {
          expanded = [expanded];
        }
        return expanded;
      };
      jsonld5.flatten = async function (input, ctx, options) {
        if (arguments.length < 1) {
          return new TypeError("Could not flatten, too few arguments.");
        }
        if (typeof ctx === "function") {
          ctx = null;
        } else {
          ctx = ctx || null;
        }
        options = _setDefaults(options, {
          base: _isString(input) ? input : "",
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        const expanded = await jsonld5.expand(input, options);
        const flattened = _flatten(expanded);
        if (ctx === null) {
          return flattened;
        }
        options.graph = true;
        options.skipExpansion = true;
        const compacted = await jsonld5.compact(flattened, ctx, options);
        return compacted;
      };
      jsonld5.frame = async function (input, frame2, options) {
        if (arguments.length < 2) {
          throw new TypeError("Could not frame, too few arguments.");
        }
        options = _setDefaults(options, {
          base: _isString(input) ? input : "",
          embed: "@once",
          explicit: false,
          requireAll: false,
          omitDefault: false,
          bnodesToClear: [],
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        if (_isString(frame2)) {
          const remoteDoc = await jsonld5.get(frame2, options);
          frame2 = remoteDoc.document;
          if (remoteDoc.contextUrl) {
            let ctx = frame2["@context"];
            if (!ctx) {
              ctx = remoteDoc.contextUrl;
            } else if (_isArray(ctx)) {
              ctx.push(remoteDoc.contextUrl);
            } else {
              ctx = [ctx, remoteDoc.contextUrl];
            }
            frame2["@context"] = ctx;
          }
        }
        const frameContext = frame2 ? frame2["@context"] || {} : {};
        const activeCtx = await jsonld5.processContext(
          _getInitialContext(options),
          frameContext,
          options
        );
        if (!options.hasOwnProperty("omitGraph")) {
          options.omitGraph = _processingMode(activeCtx, 1.1);
        }
        if (!options.hasOwnProperty("pruneBlankNodeIdentifiers")) {
          options.pruneBlankNodeIdentifiers = _processingMode(activeCtx, 1.1);
        }
        const expanded = await jsonld5.expand(input, options);
        const opts = { ...options };
        opts.isFrame = true;
        opts.keepFreeFloatingNodes = true;
        const expandedFrame = await jsonld5.expand(frame2, opts);
        const frameKeys = Object.keys(frame2).map((key) =>
          _expandIri(activeCtx, key, { vocab: true })
        );
        opts.merged = !frameKeys.includes("@graph");
        opts.is11 = _processingMode(activeCtx, 1.1);
        const framed = _frameMergedOrDefault(expanded, expandedFrame, opts);
        opts.graph = !options.omitGraph;
        opts.skipExpansion = true;
        opts.link = {};
        opts.framing = true;
        let compacted = await jsonld5.compact(framed, frameContext, opts);
        opts.link = {};
        compacted = _cleanupNull(compacted, opts);
        return compacted;
      };
      jsonld5.link = async function (input, ctx, options) {
        const frame2 = {};
        if (ctx) {
          frame2["@context"] = ctx;
        }
        frame2["@embed"] = "@link";
        return jsonld5.frame(input, frame2, options);
      };
      jsonld5.normalize = jsonld5.canonize = async function (input, options) {
        if (arguments.length < 1) {
          throw new TypeError("Could not canonize, too few arguments.");
        }
        options = _setDefaults(options, {
          base: _isString(input) ? input : null,
          algorithm: "URDNA2015",
          skipExpansion: false,
          safe: true,
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        if ("inputFormat" in options) {
          if (
            options.inputFormat !== "application/n-quads" &&
            options.inputFormat !== "application/nquads"
          ) {
            throw new JsonLdError(
              "Unknown canonicalization input format.",
              "jsonld.CanonizeError"
            );
          }
          const parsedInput = NQuads2.parse(input);
          return canonize2.canonize(parsedInput, options);
        }
        const opts = { ...options };
        delete opts.format;
        opts.produceGeneralizedRdf = false;
        const dataset = await jsonld5.toRDF(input, opts);
        return canonize2.canonize(dataset, options);
      };
      jsonld5.fromRDF = async function (dataset, options) {
        if (arguments.length < 1) {
          throw new TypeError("Could not convert from RDF, too few arguments.");
        }
        options = _setDefaults(options, {
          format: _isString(dataset) ? "application/n-quads" : void 0,
        });
        const { format } = options;
        let { rdfParser } = options;
        if (format) {
          rdfParser = rdfParser || _rdfParsers[format];
          if (!rdfParser) {
            throw new JsonLdError(
              "Unknown input format.",
              "jsonld.UnknownFormat",
              { format }
            );
          }
        } else {
          rdfParser = () => dataset;
        }
        const parsedDataset = await rdfParser(dataset);
        return _fromRDF(parsedDataset, options);
      };
      jsonld5.toRDF = async function (input, options) {
        if (arguments.length < 1) {
          throw new TypeError("Could not convert to RDF, too few arguments.");
        }
        options = _setDefaults(options, {
          base: _isString(input) ? input : "",
          skipExpansion: false,
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        let expanded;
        if (options.skipExpansion) {
          expanded = input;
        } else {
          expanded = await jsonld5.expand(input, options);
        }
        const dataset = _toRDF(expanded, options);
        if (options.format) {
          if (
            options.format === "application/n-quads" ||
            options.format === "application/nquads"
          ) {
            return NQuads2.serialize(dataset);
          }
          throw new JsonLdError(
            "Unknown output format.",
            "jsonld.UnknownFormat",
            { format: options.format }
          );
        }
        return dataset;
      };
      jsonld5.createNodeMap = async function (input, options) {
        if (arguments.length < 1) {
          throw new TypeError("Could not create node map, too few arguments.");
        }
        options = _setDefaults(options, {
          base: _isString(input) ? input : "",
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        const expanded = await jsonld5.expand(input, options);
        return _createMergedNodeMap(expanded, options);
      };
      jsonld5.merge = async function (docs, ctx, options) {
        if (arguments.length < 1) {
          throw new TypeError("Could not merge, too few arguments.");
        }
        if (!_isArray(docs)) {
          throw new TypeError('Could not merge, "docs" must be an array.');
        }
        if (typeof ctx === "function") {
          ctx = null;
        } else {
          ctx = ctx || null;
        }
        options = _setDefaults(options, {
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        const expanded = await Promise.all(
          docs.map((doc) => {
            const opts = { ...options };
            return jsonld5.expand(doc, opts);
          })
        );
        let mergeNodes = true;
        if ("mergeNodes" in options) {
          mergeNodes = options.mergeNodes;
        }
        const issuer = options.issuer || new IdentifierIssuer("_:b");
        const graphs = { "@default": {} };
        for (let i = 0; i < expanded.length; ++i) {
          const doc = util.relabelBlankNodes(expanded[i], {
            issuer: new IdentifierIssuer("_:b" + i + "-"),
          });
          const _graphs = mergeNodes || i === 0 ? graphs : { "@default": {} };
          _createNodeMap(doc, _graphs, "@default", issuer);
          if (_graphs !== graphs) {
            for (const graphName in _graphs) {
              const _nodeMap = _graphs[graphName];
              if (!(graphName in graphs)) {
                graphs[graphName] = _nodeMap;
                continue;
              }
              const nodeMap = graphs[graphName];
              for (const key in _nodeMap) {
                if (!(key in nodeMap)) {
                  nodeMap[key] = _nodeMap[key];
                }
              }
            }
          }
        }
        const defaultGraph = _mergeNodeMaps(graphs);
        const flattened = [];
        const keys = Object.keys(defaultGraph).sort();
        for (let ki = 0; ki < keys.length; ++ki) {
          const node = defaultGraph[keys[ki]];
          if (!_isSubjectReference(node)) {
            flattened.push(node);
          }
        }
        if (ctx === null) {
          return flattened;
        }
        options.graph = true;
        options.skipExpansion = true;
        const compacted = await jsonld5.compact(flattened, ctx, options);
        return compacted;
      };
      Object.defineProperty(jsonld5, "documentLoader", {
        get: () => jsonld5._documentLoader,
        set: (v) => (jsonld5._documentLoader = v),
      });
      jsonld5.documentLoader = async (url) => {
        throw new JsonLdError(
          "Could not retrieve a JSON-LD document from the URL. URL dereferencing not implemented.",
          "jsonld.LoadDocumentError",
          { code: "loading document failed", url }
        );
      };
      jsonld5.get = async function (url, options) {
        let load;
        if (typeof options.documentLoader === "function") {
          load = options.documentLoader;
        } else {
          load = jsonld5.documentLoader;
        }
        const remoteDoc = await load(url);
        try {
          if (!remoteDoc.document) {
            throw new JsonLdError(
              "No remote document found at the given URL.",
              "jsonld.NullRemoteDocument"
            );
          }
          if (_isString(remoteDoc.document)) {
            remoteDoc.document = JSON.parse(remoteDoc.document);
          }
        } catch (e) {
          throw new JsonLdError(
            "Could not retrieve a JSON-LD document from the URL.",
            "jsonld.LoadDocumentError",
            {
              code: "loading document failed",
              cause: e,
              remoteDoc,
            }
          );
        }
        return remoteDoc;
      };
      jsonld5.processContext = async function (activeCtx, localCtx, options) {
        options = _setDefaults(options, {
          base: "",
          contextResolver: new ContextResolver({
            sharedCache: _resolvedContextCache,
          }),
        });
        if (localCtx === null) {
          return _getInitialContext(options);
        }
        localCtx = util.clone(localCtx);
        if (!(_isObject(localCtx) && "@context" in localCtx)) {
          localCtx = { "@context": localCtx };
        }
        return _processContext({ activeCtx, localCtx, options });
      };
      jsonld5.getContextValue = require_context().getContextValue;
      jsonld5.documentLoaders = {};
      jsonld5.useDocumentLoader = function (type) {
        if (!(type in jsonld5.documentLoaders)) {
          throw new JsonLdError(
            'Unknown document loader type: "' + type + '"',
            "jsonld.UnknownDocumentLoader",
            { type }
          );
        }
        jsonld5.documentLoader = jsonld5.documentLoaders[type].apply(
          jsonld5,
          Array.prototype.slice.call(arguments, 1)
        );
      };
      jsonld5.registerRDFParser = function (contentType, parser) {
        _rdfParsers[contentType] = parser;
      };
      jsonld5.unregisterRDFParser = function (contentType) {
        delete _rdfParsers[contentType];
      };
      jsonld5.registerRDFParser("application/n-quads", NQuads2.parse);
      jsonld5.registerRDFParser("application/nquads", NQuads2.parse);
      jsonld5.url = require_url();
      jsonld5.logEventHandler = _logEventHandler;
      jsonld5.logWarningEventHandler = _logWarningEventHandler;
      jsonld5.safeEventHandler = _safeEventHandler;
      jsonld5.setDefaultEventHandler = _setDefaultEventHandler;
      jsonld5.strictEventHandler = _strictEventHandler;
      jsonld5.unhandledEventHandler = _unhandledEventHandler;
      jsonld5.util = util;
      Object.assign(jsonld5, util);
      jsonld5.promises = jsonld5;
      jsonld5.RequestQueue = require_RequestQueue();
      jsonld5.JsonLdProcessor = require_JsonLdProcessor()(jsonld5);
      platform.setupGlobals(jsonld5);
      platform.setupDocumentLoaders(jsonld5);
      function _setDefaults(
        options,
        { documentLoader = jsonld5.documentLoader, ...defaults }
      ) {
        if (options && "compactionMap" in options) {
          throw new JsonLdError(
            '"compactionMap" not supported.',
            "jsonld.OptionsError"
          );
        }
        if (options && "expansionMap" in options) {
          throw new JsonLdError(
            '"expansionMap" not supported.',
            "jsonld.OptionsError"
          );
        }
        return Object.assign({}, { documentLoader }, defaults, options, {
          eventHandler: _setupEventHandler({ options }),
        });
      }
      return jsonld5;
    };
    const factory = function () {
      return wrapper(function () {
        return factory();
      });
    };
    wrapper(factory);
    module2.exports = factory;
  },
});
var require_lib2 = __commonJS({
  "node_modules/jsonld/lib/index.js"(exports, module2) {
    module2.exports = require_jsonld();
  },
});
var require_pad_string = __commonJS({
  "node_modules/base64url/dist/pad-string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function padString(input) {
      const segmentLength = 4;
      const stringLength = input.length;
      const diff = stringLength % segmentLength;
      if (!diff) {
        return input;
      }
      let position = stringLength;
      let padLength = segmentLength - diff;
      const paddedStringLength = stringLength + padLength;
      const buffer2 = Buffer.alloc(paddedStringLength);
      buffer2.write(input);
      while (padLength--) {
        buffer2.write("=", position++);
      }
      return buffer2.toString();
    }
    exports.default = padString;
  },
});
var require_base64url = __commonJS({
  "node_modules/base64url/dist/base64url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const pad_string_1 = require_pad_string();
    function encode5(input, encoding) {
      if (encoding === void 0) {
        encoding = "utf8";
      }
      if (Buffer.isBuffer(input)) {
        return fromBase64(input.toString("base64"));
      }
      return fromBase64(Buffer.from(input, encoding).toString("base64"));
    }
    function decode5(base64url3, encoding) {
      if (encoding === void 0) {
        encoding = "utf8";
      }
      return Buffer.from(toBase64(base64url3), "base64").toString(encoding);
    }
    function toBase64(base64url3) {
      base64url3 = base64url3.toString();
      return pad_string_1
        .default(base64url3)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
    }
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function toBuffer(base64url3) {
      return Buffer.from(toBase64(base64url3), "base64");
    }
    const base64url2 = encode5;
    base64url2.encode = encode5;
    base64url2.decode = decode5;
    base64url2.toBase64 = toBase64;
    base64url2.fromBase64 = fromBase64;
    base64url2.toBuffer = toBuffer;
    exports.default = base64url2;
  },
});
var require_base64url2 = __commonJS({
  "node_modules/base64url/index.js"(exports, module2) {
    module2.exports = require_base64url().default;
    module2.exports.default = module2.exports;
  },
});
var lib_exports4 = {};
__export(lib_exports4, {
  createDiscloseCryptosuite: () => createDiscloseCryptosuite,
  createSignCryptosuite: () => createSignCryptosuite,
  createVerifyCryptosuite: () => createVerifyCryptosuite,
});
module.exports = __toCommonJS(lib_exports4);
var import_jsonld = __toESM(require_lib2(), 1);
function deskolemize({ nquads } = {}) {
  const mutated = [];
  for (const nq of nquads) {
    if (!nq.includes("<urn:bnid:")) {
      mutated.push(nq);
    } else {
      mutated.push(nq.replace(/(<urn:bnid:([^>]+)>)/g, "_:$2"));
    }
  }
  return mutated;
}
function skolemize({ nquads } = {}) {
  const mutated = [];
  for (const nq of nquads) {
    if (!nq.includes("_:")) {
      mutated.push(nq);
    } else {
      mutated.push(nq.replace(/(_:([^\s]+))/g, "<urn:bnid:$2>"));
    }
  }
  return mutated;
}
async function toDeskolemizedRDF({ doc, options } = {}) {
  const rdfOptions = { ...options, format: "application/n-quads" };
  const rdf = await import_jsonld.default.toRDF(doc, rdfOptions);
  const skolemized = rdf
    .split("\n")
    .slice(0, -1)
    .map((nq) => nq + "\n");
  return deskolemize({ nquads: skolemized });
}
var import_base64url = __toESM(require_base64url2(), 1);
var encode = import_base64url.default.encode;
var decode = import_base64url.default.toBuffer;
var import_node_crypto = __toESM(
  crypto, //import("https://deno.land/std@0.192.0/crypto/mod.ts"),
  1
);
function createHasher({ algorithm = "sha256" } = {}) {
  if (algorithm !== "sha256") {
    throw new Error(`Unsupported algorithm "${algorithm}".`);
  }
  return {
    async hash(bytes) {
      return new Uint8Array(
        import_node_crypto.default.createHash("sha256").update(bytes).digest()
      );
    },
  };
}
var import_jsonld2 = __toESM(require_lib2(), 1);
var import_rdf_canonize = __toESM(require_rdf_canonize(), 1);
var TEXT_ENCODER = new TextEncoder();
function stringToUtf8Bytes(str) {
  return TEXT_ENCODER.encode(str);
}
var { NQuads } = import_rdf_canonize.default;
var COMPONENT_NAMES = ["subject", "predicate", "object", "graph"];
async function hmacIdCanonize({ document, options, hmac, labelMap } = {}) {
  if (!(document && typeof document === "object")) {
    throw new TypeError('"document" must be an object.');
  }
  let labelMutator;
  if (labelMap) {
    labelMutator = async (label) => `_:${labelMap.get(label.slice(2))}`;
  } else {
    labelMutator = async (label) => {
      const utf8Bytes = stringToUtf8Bytes(label.slice(2));
      const hashed = await hmac.sign(utf8Bytes);
      return `_:u${encode(hashed)}`;
    };
  }
  return _customCanonize({ document, options, labelMutator });
}
async function canonize(input, options) {
  if (!(options && typeof options === "object")) {
    throw new TypeError('"options" must be an object.');
  }
  return import_jsonld2.default.canonize(input, {
    algorithm: "URDNA2015",
    format: "application/n-quads",
    ...options,
  });
}
async function canonizeProof({ document, proof, options } = {}) {
  proof = {
    "@context": document["@context"],
    ...proof,
  };
  delete proof.proofValue;
  return canonize(proof, options);
}
async function hashCanonizedProof({ document, proof, options, hasher } = {}) {
  if (!hasher) {
    hasher = createHasher();
  }
  const canonized = await canonizeProof({ document, proof, options });
  return hasher.hash(stringToUtf8Bytes(canonized));
}
async function _customCanonize({ document, options, labelMutator } = {}) {
  const original = await canonize(document, options);
  const quads = NQuads.parse(original);
  const mutatedQuads = [];
  for (const quad of quads) {
    const updated = { ...quad };
    mutatedQuads.push(updated);
    for (const name2 of COMPONENT_NAMES) {
      const component = quad[name2];
      if (component.termType === "BlankNode") {
        updated[name2] = {
          ...component,
          value: await labelMutator(component.value),
        };
      }
    }
  }
  const mutated = [];
  for (const q of mutatedQuads) {
    mutated.push(NQuads.serializeQuad(q));
  }
  mutated.sort();
  return mutated;
}
var import_node_crypto2 = __toESM(
  crypto, //import("https://deno.land/std@0.192.0/crypto/mod.ts"),
  1
);
async function createHmac({ algorithm = "HS256", key } = {}) {
  if (algorithm !== "HS256") {
    throw new Error(`Unsupported algorithm "${algorithm}".`);
  }
  if (!(key === null || key instanceof Uint8Array)) {
    throw new TypeError('"key" must be null or a Uint8Array.');
  }
  if (key === null) {
    key = await import_node_crypto2.default.webcrypto.getRandomValues(
      new Uint8Array(32)
    );
  }
  return {
    async export() {
      return Uint8Array.prototype.slice.call(key);
    },
    async sign(bytes) {
      const hmac = import_node_crypto2.default.createHmac("sha256", key);
      return new Uint8Array(hmac.update(bytes).digest());
    },
  };
}
var import_jsonld3 = __toESM(require_lib2(), 1);
var FRAME_FLAGS = {
  requireAll: true,
  explicit: true,
  omitGraph: true,
};
async function frame(document, frame2, options) {
  return import_jsonld3.default.frame(document, frame2, {
    ...options,
    ...FRAME_FLAGS,
  });
}
var import_jsonld4 = __toESM(require_lib2(), 1);
async function filterAndGroup({
  nquads,
  filterFrame,
  groupFrame,
  options,
} = {}) {
  const skolemized = skolemize({ nquads });
  const skolemizedDoc = await _createSkolemizedDocument({
    skolemized,
    options,
  });
  const filteredDoc = await frame(skolemizedDoc, filterFrame, options);
  const filteredNQuads = await toDeskolemizedRDF({ doc: filteredDoc, options });
  const canonicalIdMap = /* @__PURE__ */ new Map();
  const [, groupResult] = await Promise.all([
    canonize(filteredNQuads.join(""), {
      ...options,
      inputFormat: "application/n-quads",
      canonicalIdMap,
    }),
    group({
      nquads: filteredNQuads,
      skolemizedDoc: filteredDoc,
      frame: groupFrame,
      options,
    }),
  ]);
  const matching = /* @__PURE__ */ new Map();
  const nonMatching = /* @__PURE__ */ new Map();
  const filteredMatches = [...groupResult.matching.values()];
  const filteredNonMatches = [...groupResult.nonMatching.values()];
  for (const [index, nq] of nquads.entries()) {
    if (
      matching.size < filteredMatches.length &&
      filteredMatches.includes(nq)
    ) {
      matching.set(index, nq);
    } else if (
      nonMatching.size < filteredNonMatches.length &&
      filteredNonMatches.includes(nq)
    ) {
      nonMatching.set(index, nq);
    }
  }
  return {
    filtered: groupResult,
    labelMap: _createLabelMap(canonicalIdMap),
    matching,
    nonMatching,
  };
}
async function group({ nquads, skolemizedDoc, frame: frame2, options } = {}) {
  if (!frame2) {
    return {
      nquads,
      matching: /* @__PURE__ */ new Map(),
      nonMatching: new Map([...nquads.entries()]),
    };
  }
  if (!skolemizedDoc) {
    const skolemized = skolemize({ nquads });
    skolemizedDoc = await _createSkolemizedDocument({ skolemized, options });
  }
  const framed = await frame(skolemizedDoc, frame2, options);
  const matchingDeskolemized = await toDeskolemizedRDF({
    doc: framed,
    options,
  });
  const matching = /* @__PURE__ */ new Map();
  const nonMatching = /* @__PURE__ */ new Map();
  for (const [index, nq] of nquads.entries()) {
    if (
      matching.size < matchingDeskolemized.length &&
      matchingDeskolemized.includes(nq)
    ) {
      matching.set(index, nq);
    } else {
      nonMatching.set(index, nq);
    }
  }
  return { nquads, matching, nonMatching };
}
async function _createSkolemizedDocument({ skolemized, options } = {}) {
  const dataset = skolemized.join("");
  const rdfOptions = { ...options, format: "application/n-quads" };
  return import_jsonld4.default.fromRDF(dataset, rdfOptions);
}
function _createLabelMap(map) {
  const reversed = /* @__PURE__ */ new Map();
  for (const [k, v] of map.entries()) {
    reversed.set(v.slice(2), k.slice(2));
  }
  return reversed;
}
async function hashMandatory({ mandatory, hasher } = {}) {
  if (!hasher) {
    hasher = createHasher();
  }
  const mandatoryHash = await hasher.hash(
    stringToUtf8Bytes(mandatory.join(""))
  );
  return { mandatoryHash };
}
function klona(x) {
  if (typeof x !== "object") {
    return x;
  }
  let k;
  let tmp;
  const str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    if (x.constructor !== Object && typeof x.constructor === "function") {
      tmp = new x.constructor();
      for (k in x) {
        if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
          tmp[k] = klona(x[k]);
        }
      }
    } else {
      tmp = {};
      for (k in x) {
        if (k === "__proto__") {
          Object.defineProperty(tmp, k, {
            value: klona(x[k]),
            configurable: true,
            enumerable: true,
            writable: true,
          });
        } else {
          tmp[k] = klona(x[k]);
        }
      }
    }
    return tmp;
  }
  if (str === "[object Array]") {
    k = x.length;
    for (tmp = Array(k); k--; ) {
      tmp[k] = klona(x[k]);
    }
    return tmp;
  }
  if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function (val) {
      tmp.add(klona(val));
    });
    return tmp;
  }
  if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function (val, key) {
      tmp.set(klona(key), klona(val));
    });
    return tmp;
  }
  if (str === "[object Date]") {
    return /* @__PURE__ */ new Date(+x);
  }
  if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
    tmp.lastIndex = x.lastIndex;
    return tmp;
  }
  if (str === "[object DataView]") {
    return new x.constructor(klona(x.buffer));
  }
  if (str === "[object ArrayBuffer]") {
    return x.slice(0);
  }
  if (str.slice(-6) === "Array]") {
    return new x.constructor(x);
  }
  return x;
}
var POINTER_ESCAPE_REGEX = /~[01]/g;
function pointersToFrame({ document, pointers, includeTypes = true } = {}) {
  if (!(document && typeof document === "object")) {
    throw new TypeError('"document" must be an object.');
  }
  if (!Array.isArray(pointers)) {
    throw new TypeError('"pointers" must be an array.');
  }
  if (pointers.length === 0) {
    return null;
  }
  let frame2 = _initFrame({ value: document, includeTypes });
  for (const pointer of pointers) {
    let parentFrame = frame2;
    let parentValue = document;
    let value = parentValue;
    let valueFrame = parentFrame;
    const paths = _parsePointer(pointer);
    for (const path of paths) {
      parentFrame = valueFrame;
      parentValue = value;
      value = parentValue[path];
      if (value === void 0) {
        throw new TypeError(
          `JSON pointer "${pointer}" does not match document.`
        );
      }
      valueFrame = parentFrame[path];
      if (valueFrame === void 0) {
        if (Array.isArray(value)) {
          valueFrame = [];
        } else {
          valueFrame = _initFrame({ value, includeTypes });
        }
        parentFrame[path] = valueFrame;
      }
    }
    if (typeof value !== "object") {
      valueFrame = value;
    } else {
      if (Array.isArray(value)) {
        valueFrame = value.map((e) => {
          if (Array.isArray(e)) {
            throw new TypeError("Arrays of arrays are not supported.");
          }
          return klona(e);
        });
      } else {
        valueFrame = { ...valueFrame, ...klona(value) };
      }
    }
    if (paths.length === 0) {
      frame2 = valueFrame;
    } else {
      parentFrame[paths.at(-1)] = valueFrame;
    }
  }
  frame2["@context"] = klona(document["@context"]);
  return frame2;
}
function _initFrame({ value, includeTypes }) {
  const frame2 = {};
  if (value.id && !value.id.startsWith("_:")) {
    frame2.id = value.id;
  }
  if (includeTypes && value.type) {
    frame2.type = value.type;
  }
  return frame2;
}
function _parsePointer(pointer) {
  const parsed = [];
  const paths = pointer.split("/").slice(1);
  for (const path of paths) {
    if (!path.includes("~")) {
      const index = parseInt(path, 10);
      parsed.push(isNaN(index) ? path : index);
    } else {
      parsed.push(path.replace(POINTER_ESCAPE_REGEX, _unescapePointerPath));
    }
  }
  return parsed;
}
function _unescapePointerPath(m) {
  if (m === "~1") {
    return "/";
  }
  if (m === "~0") {
    return "~";
  }
  throw new Error(`Invalid JSON pointer escape sequence "${m}".`);
}
var typeofs = ["string", "number", "bigint", "symbol"];
var objectTypeNames = [
  "Function",
  "Generator",
  "AsyncGenerator",
  "GeneratorFunction",
  "AsyncGeneratorFunction",
  "AsyncFunction",
  "Observable",
  "Array",
  "Buffer",
  "Object",
  "RegExp",
  "Date",
  "Error",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Promise",
  "URL",
  "HTMLElement",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array",
];
function is(value) {
  if (value === null) {
    return "null";
  }
  if (value === void 0) {
    return "undefined";
  }
  if (value === true || value === false) {
    return "boolean";
  }
  const typeOf = typeof value;
  if (typeofs.includes(typeOf)) {
    return typeOf;
  }
  if (typeOf === "function") {
    return "Function";
  }
  if (Array.isArray(value)) {
    return "Array";
  }
  if (isBuffer(value)) {
    return "Buffer";
  }
  const objectType = getObjectType(value);
  if (objectType) {
    return objectType;
  }
  return "Object";
}
function isBuffer(value) {
  return (
    value &&
    value.constructor &&
    value.constructor.isBuffer &&
    value.constructor.isBuffer.call(null, value)
  );
}
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames.includes(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}
var Type = class {
  constructor(major, name2, terminal) {
    this.major = major;
    this.majorEncoded = major << 5;
    this.name = name2;
    this.terminal = terminal;
  }
  toString() {
    return `Type[${this.major}].${this.name}`;
  }
  compare(typ) {
    return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
  }
};
Type.uint = new Type(0, "uint", true);
Type.negint = new Type(1, "negint", true);
Type.bytes = new Type(2, "bytes", true);
Type.string = new Type(3, "string", true);
Type.array = new Type(4, "array", false);
Type.map = new Type(5, "map", false);
Type.tag = new Type(6, "tag", false);
Type.float = new Type(7, "float", true);
Type.false = new Type(7, "false", true);
Type.true = new Type(7, "true", true);
Type.null = new Type(7, "null", true);
Type.undefined = new Type(7, "undefined", true);
Type.break = new Type(7, "break", true);
var Token = class {
  constructor(type, value, encodedLength) {
    this.type = type;
    this.value = value;
    this.encodedLength = encodedLength;
    this.encodedBytes = void 0;
    this.byteValue = void 0;
  }
  toString() {
    return `Token[${this.type}].${this.value}`;
  }
};
var useBuffer =
  globalThis.process &&
  !globalThis.process.browser &&
  globalThis.Buffer &&
  typeof globalThis.Buffer.isBuffer === "function";
var textDecoder = new TextDecoder();
var textEncoder = new TextEncoder();
function isBuffer2(buf2) {
  return useBuffer && globalThis.Buffer.isBuffer(buf2);
}
function asU8A(buf2) {
  if (!(buf2 instanceof Uint8Array)) {
    return Uint8Array.from(buf2);
  }
  return isBuffer2(buf2)
    ? new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength)
    : buf2;
}
var toString = useBuffer
  ? (bytes, start, end) => {
      return end - start > 64
        ? globalThis.Buffer.from(bytes.subarray(start, end)).toString("utf8")
        : utf8Slice(bytes, start, end);
    }
  : (bytes, start, end) => {
      return end - start > 64
        ? textDecoder.decode(bytes.subarray(start, end))
        : utf8Slice(bytes, start, end);
    };
var fromString = useBuffer
  ? (string) => {
      return string.length > 64
        ? globalThis.Buffer.from(string)
        : utf8ToBytes(string);
    }
  : (string) => {
      return string.length > 64
        ? textEncoder.encode(string)
        : utf8ToBytes(string);
    };
var fromArray = (arr) => {
  return Uint8Array.from(arr);
};
var slice = useBuffer
  ? (bytes, start, end) => {
      if (isBuffer2(bytes)) {
        return new Uint8Array(bytes.subarray(start, end));
      }
      return bytes.slice(start, end);
    }
  : (bytes, start, end) => {
      return bytes.slice(start, end);
    };
var concat = useBuffer
  ? (chunks, length) => {
      chunks = chunks.map((c) =>
        c instanceof Uint8Array ? c : globalThis.Buffer.from(c)
      );
      return asU8A(globalThis.Buffer.concat(chunks, length));
    }
  : (chunks, length) => {
      const out = new Uint8Array(length);
      let off = 0;
      for (let b of chunks) {
        if (off + b.length > out.length) {
          b = b.subarray(0, out.length - off);
        }
        out.set(b, off);
        off += b.length;
      }
      return out;
    };
var alloc = useBuffer
  ? (size) => {
      return globalThis.Buffer.allocUnsafe(size);
    }
  : (size) => {
      return new Uint8Array(size);
    };
function compare(b1, b2) {
  if (isBuffer2(b1) && isBuffer2(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes(string, units = Infinity) {
  let codePoint;
  const length = string.length;
  let leadSurrogate = null;
  const bytes = [];
  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1) {
            bytes.push(239, 191, 189);
          }
          continue;
        } else if (i + 1 === length) {
          if ((units -= 3) > -1) {
            bytes.push(239, 191, 189);
          }
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1) {
          bytes.push(239, 191, 189);
        }
        leadSurrogate = codePoint;
        continue;
      }
      codePoint =
        (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) {
        bytes.push(239, 191, 189);
      }
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) {
        break;
      }
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) {
        break;
      }
      bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0) {
        break;
      }
      bytes.push(
        (codePoint >> 12) | 224,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0) {
        break;
      }
      bytes.push(
        (codePoint >> 18) | 240,
        ((codePoint >> 12) & 63) | 128,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function utf8Slice(buf2, offset, end) {
  const res = [];
  while (offset < end) {
    const firstByte = buf2[offset];
    let codePoint = null;
    let bytesPerSequence =
      firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end) {
      let secondByte;
      let thirdByte;
      let fourthByte;
      let tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf2[offset + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint =
              ((firstByte & 15) << 12) |
              ((secondByte & 63) << 6) |
              (thirdByte & 63);
            if (
              tempCodePoint > 2047 &&
              (tempCodePoint < 55296 || tempCodePoint > 57343)
            ) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          fourthByte = buf2[offset + 3];
          if (
            (secondByte & 192) === 128 &&
            (thirdByte & 192) === 128 &&
            (fourthByte & 192) === 128
          ) {
            tempCodePoint =
              ((firstByte & 15) << 18) |
              ((secondByte & 63) << 12) |
              ((thirdByte & 63) << 6) |
              (fourthByte & 63);
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(((codePoint >>> 10) & 1023) | 55296);
      codePoint = 56320 | (codePoint & 1023);
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
var MAX_ARGUMENTS_LENGTH = 4096;
function decodeCodePointsArray(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = "";
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
    );
  }
  return res;
}
var defaultChunkSize = 256;
var Bl = class {
  constructor(chunkSize = defaultChunkSize) {
    this.chunkSize = chunkSize;
    this.cursor = 0;
    this.maxCursor = -1;
    this.chunks = [];
    this._initReuseChunk = null;
  }
  reset() {
    this.cursor = 0;
    this.maxCursor = -1;
    if (this.chunks.length) {
      this.chunks = [];
    }
    if (this._initReuseChunk !== null) {
      this.chunks.push(this._initReuseChunk);
      this.maxCursor = this._initReuseChunk.length - 1;
    }
  }
  push(bytes) {
    let topChunk = this.chunks[this.chunks.length - 1];
    const newMax = this.cursor + bytes.length;
    if (newMax <= this.maxCursor + 1) {
      const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
      topChunk.set(bytes, chunkPos);
    } else {
      if (topChunk) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        if (chunkPos < topChunk.length) {
          this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
          this.maxCursor = this.cursor - 1;
        }
      }
      if (bytes.length < 64 && bytes.length < this.chunkSize) {
        topChunk = alloc(this.chunkSize);
        this.chunks.push(topChunk);
        this.maxCursor += topChunk.length;
        if (this._initReuseChunk === null) {
          this._initReuseChunk = topChunk;
        }
        topChunk.set(bytes, 0);
      } else {
        this.chunks.push(bytes);
        this.maxCursor += bytes.length;
      }
    }
    this.cursor += bytes.length;
  }
  toBytes(reset = false) {
    let byts;
    if (this.chunks.length === 1) {
      const chunk = this.chunks[0];
      if (reset && this.cursor > chunk.length / 2) {
        byts =
          this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
        this._initReuseChunk = null;
        this.chunks = [];
      } else {
        byts = slice(chunk, 0, this.cursor);
      }
    } else {
      byts = concat(this.chunks, this.cursor);
    }
    if (reset) {
      this.reset();
    }
    return byts;
  }
};
var decodeErrPrefix = "CBOR decode error:";
var encodeErrPrefix = "CBOR encode error:";
var uintMinorPrefixBytes = [];
uintMinorPrefixBytes[23] = 1;
uintMinorPrefixBytes[24] = 2;
uintMinorPrefixBytes[25] = 3;
uintMinorPrefixBytes[26] = 5;
uintMinorPrefixBytes[27] = 9;
function assertEnoughData(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${decodeErrPrefix} not enough data for type`);
  }
}
var uintBoundaries = [
  24,
  256,
  65536,
  4294967296,
  BigInt("18446744073709551616"),
];
function readUint8(data, offset, options) {
  assertEnoughData(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries[0]) {
    throw new Error(
      `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
    );
  }
  return value;
}
function readUint16(data, offset, options) {
  assertEnoughData(data, offset, 2);
  const value = (data[offset] << 8) | data[offset + 1];
  if (options.strict === true && value < uintBoundaries[1]) {
    throw new Error(
      `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
    );
  }
  return value;
}
function readUint32(data, offset, options) {
  assertEnoughData(data, offset, 4);
  const value =
    data[offset] * 16777216 +
    (data[offset + 1] << 16) +
    (data[offset + 2] << 8) +
    data[offset + 3];
  if (options.strict === true && value < uintBoundaries[2]) {
    throw new Error(
      `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
    );
  }
  return value;
}
function readUint64(data, offset, options) {
  assertEnoughData(data, offset, 8);
  const hi =
    data[offset] * 16777216 +
    (data[offset + 1] << 16) +
    (data[offset + 2] << 8) +
    data[offset + 3];
  const lo =
    data[offset + 4] * 16777216 +
    (data[offset + 5] << 16) +
    (data[offset + 6] << 8) +
    data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries[3]) {
    throw new Error(
      `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
    );
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(
    `${decodeErrPrefix} integers outside of the safe integer range are not supported`
  );
}
function decodeUint8(data, pos, _minor, options) {
  return new Token(Type.uint, readUint8(data, pos + 1, options), 2);
}
function decodeUint16(data, pos, _minor, options) {
  return new Token(Type.uint, readUint16(data, pos + 1, options), 3);
}
function decodeUint32(data, pos, _minor, options) {
  return new Token(Type.uint, readUint32(data, pos + 1, options), 5);
}
function decodeUint64(data, pos, _minor, options) {
  return new Token(Type.uint, readUint64(data, pos + 1, options), 9);
}
function encodeUint(buf2, token) {
  return encodeUintValue(buf2, 0, token.value);
}
function encodeUintValue(buf2, major, uint) {
  if (uint < uintBoundaries[0]) {
    const nuint = Number(uint);
    buf2.push([major | nuint]);
  } else if (uint < uintBoundaries[1]) {
    const nuint = Number(uint);
    buf2.push([major | 24, nuint]);
  } else if (uint < uintBoundaries[2]) {
    const nuint = Number(uint);
    buf2.push([major | 25, nuint >>> 8, nuint & 255]);
  } else if (uint < uintBoundaries[3]) {
    const nuint = Number(uint);
    buf2.push([
      major | 26,
      (nuint >>> 24) & 255,
      (nuint >>> 16) & 255,
      (nuint >>> 8) & 255,
      nuint & 255,
    ]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries[4]) {
      const set = [major | 27, 0, 0, 0, 0, 0, 0, 0];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number((buint >> BigInt(32)) & BigInt(4294967295));
      set[8] = lo & 255;
      lo = lo >> 8;
      set[7] = lo & 255;
      lo = lo >> 8;
      set[6] = lo & 255;
      lo = lo >> 8;
      set[5] = lo & 255;
      set[4] = hi & 255;
      hi = hi >> 8;
      set[3] = hi & 255;
      hi = hi >> 8;
      set[2] = hi & 255;
      hi = hi >> 8;
      set[1] = hi & 255;
      buf2.push(set);
    } else {
      throw new Error(
        `${decodeErrPrefix} encountered BigInt larger than allowable range`
      );
    }
  }
}
encodeUint.encodedSize = function encodedSize(token) {
  return encodeUintValue.encodedSize(token.value);
};
encodeUintValue.encodedSize = function encodedSize2(uint) {
  if (uint < uintBoundaries[0]) {
    return 1;
  }
  if (uint < uintBoundaries[1]) {
    return 2;
  }
  if (uint < uintBoundaries[2]) {
    return 3;
  }
  if (uint < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeUint.compareTokens = function compareTokens(tok1, tok2) {
  return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : 0;
};
function decodeNegint8(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint8(data, pos + 1, options), 2);
}
function decodeNegint16(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint16(data, pos + 1, options), 3);
}
function decodeNegint32(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint32(data, pos + 1, options), 5);
}
var neg1b = BigInt(-1);
var pos1b = BigInt(1);
function decodeNegint64(data, pos, _minor, options) {
  const int = readUint64(data, pos + 1, options);
  if (typeof int !== "bigint") {
    const value = -1 - int;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new Token(Type.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(
      `${decodeErrPrefix} integers outside of the safe integer range are not supported`
    );
  }
  return new Token(Type.negint, neg1b - BigInt(int), 9);
}
function encodeNegint(buf2, token) {
  const negint = token.value;
  const unsigned =
    typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  encodeUintValue(buf2, token.type.majorEncoded, unsigned);
}
encodeNegint.encodedSize = function encodedSize3(token) {
  const negint = token.value;
  const unsigned =
    typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  if (unsigned < uintBoundaries[0]) {
    return 1;
  }
  if (unsigned < uintBoundaries[1]) {
    return 2;
  }
  if (unsigned < uintBoundaries[2]) {
    return 3;
  }
  if (unsigned < uintBoundaries[3]) {
    return 5;
  }
  return 9;
};
encodeNegint.compareTokens = function compareTokens2(tok1, tok2) {
  return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : 0;
};
function toToken(data, pos, prefix, length) {
  assertEnoughData(data, pos, prefix + length);
  const buf2 = slice(data, pos + prefix, pos + prefix + length);
  return new Token(Type.bytes, buf2, prefix + length);
}
function decodeBytesCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeBytes8(data, pos, _minor, options) {
  return toToken(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeBytes16(data, pos, _minor, options) {
  return toToken(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeBytes32(data, pos, _minor, options) {
  return toToken(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeBytes64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(
      `${decodeErrPrefix} 64-bit integer bytes lengths not supported`
    );
  }
  return toToken(data, pos, 9, l);
}
function tokenBytes(token) {
  if (token.encodedBytes === void 0) {
    token.encodedBytes =
      token.type === Type.string ? fromString(token.value) : token.value;
  }
  return token.encodedBytes;
}
function encodeBytes(buf2, token) {
  const bytes = tokenBytes(token);
  encodeUintValue(buf2, token.type.majorEncoded, bytes.length);
  buf2.push(bytes);
}
encodeBytes.encodedSize = function encodedSize4(token) {
  const bytes = tokenBytes(token);
  return encodeUintValue.encodedSize(bytes.length) + bytes.length;
};
encodeBytes.compareTokens = function compareTokens3(tok1, tok2) {
  return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
};
function compareBytes(b1, b2) {
  return b1.length < b2.length
    ? -1
    : b1.length > b2.length
    ? 1
    : compare(b1, b2);
}
function toToken2(data, pos, prefix, length, options) {
  const totLength = prefix + length;
  assertEnoughData(data, pos, totLength);
  const tok = new Token(
    Type.string,
    toString(data, pos + prefix, pos + totLength),
    totLength
  );
  if (options.retainStringBytes === true) {
    tok.byteValue = slice(data, pos + prefix, pos + totLength);
  }
  return tok;
}
function decodeStringCompact(data, pos, minor, options) {
  return toToken2(data, pos, 1, minor, options);
}
function decodeString8(data, pos, _minor, options) {
  return toToken2(data, pos, 2, readUint8(data, pos + 1, options), options);
}
function decodeString16(data, pos, _minor, options) {
  return toToken2(data, pos, 3, readUint16(data, pos + 1, options), options);
}
function decodeString32(data, pos, _minor, options) {
  return toToken2(data, pos, 5, readUint32(data, pos + 1, options), options);
}
function decodeString64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(
      `${decodeErrPrefix} 64-bit integer string lengths not supported`
    );
  }
  return toToken2(data, pos, 9, l, options);
}
var encodeString = encodeBytes;
function toToken3(_data, _pos, prefix, length) {
  return new Token(Type.array, length, prefix);
}
function decodeArrayCompact(data, pos, minor, _options) {
  return toToken3(data, pos, 1, minor);
}
function decodeArray8(data, pos, _minor, options) {
  return toToken3(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeArray16(data, pos, _minor, options) {
  return toToken3(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeArray32(data, pos, _minor, options) {
  return toToken3(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeArray64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(
      `${decodeErrPrefix} 64-bit integer array lengths not supported`
    );
  }
  return toToken3(data, pos, 9, l);
}
function decodeArrayIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken3(data, pos, 1, Infinity);
}
function encodeArray(buf2, token) {
  encodeUintValue(buf2, Type.array.majorEncoded, token.value);
}
encodeArray.compareTokens = encodeUint.compareTokens;
encodeArray.encodedSize = function encodedSize5(token) {
  return encodeUintValue.encodedSize(token.value);
};
function toToken4(_data, _pos, prefix, length) {
  return new Token(Type.map, length, prefix);
}
function decodeMapCompact(data, pos, minor, _options) {
  return toToken4(data, pos, 1, minor);
}
function decodeMap8(data, pos, _minor, options) {
  return toToken4(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeMap16(data, pos, _minor, options) {
  return toToken4(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeMap32(data, pos, _minor, options) {
  return toToken4(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeMap64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(
      `${decodeErrPrefix} 64-bit integer map lengths not supported`
    );
  }
  return toToken4(data, pos, 9, l);
}
function decodeMapIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken4(data, pos, 1, Infinity);
}
function encodeMap(buf2, token) {
  encodeUintValue(buf2, Type.map.majorEncoded, token.value);
}
encodeMap.compareTokens = encodeUint.compareTokens;
encodeMap.encodedSize = function encodedSize6(token) {
  return encodeUintValue.encodedSize(token.value);
};
function decodeTagCompact(_data, _pos, minor, _options) {
  return new Token(Type.tag, minor, 1);
}
function decodeTag8(data, pos, _minor, options) {
  return new Token(Type.tag, readUint8(data, pos + 1, options), 2);
}
function decodeTag16(data, pos, _minor, options) {
  return new Token(Type.tag, readUint16(data, pos + 1, options), 3);
}
function decodeTag32(data, pos, _minor, options) {
  return new Token(Type.tag, readUint32(data, pos + 1, options), 5);
}
function decodeTag64(data, pos, _minor, options) {
  return new Token(Type.tag, readUint64(data, pos + 1, options), 9);
}
function encodeTag(buf2, token) {
  encodeUintValue(buf2, Type.tag.majorEncoded, token.value);
}
encodeTag.compareTokens = encodeUint.compareTokens;
encodeTag.encodedSize = function encodedSize7(token) {
  return encodeUintValue.encodedSize(token.value);
};
var MINOR_FALSE = 20;
var MINOR_TRUE = 21;
var MINOR_NULL = 22;
var MINOR_UNDEFINED = 23;
function decodeUndefined(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${decodeErrPrefix} undefined values are not supported`);
  } else if (options.coerceUndefinedToNull === true) {
    return new Token(Type.null, null, 1);
  }
  return new Token(Type.undefined, void 0, 1);
}
function decodeBreak(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return new Token(Type.break, void 0, 1);
}
function createToken(value, bytes, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${decodeErrPrefix} NaN values are not supported`);
    }
    if (
      options.allowInfinity === false &&
      (value === Infinity || value === -Infinity)
    ) {
      throw new Error(`${decodeErrPrefix} Infinity values are not supported`);
    }
  }
  return new Token(Type.float, value, bytes);
}
function decodeFloat16(data, pos, _minor, options) {
  return createToken(readFloat16(data, pos + 1), 3, options);
}
function decodeFloat32(data, pos, _minor, options) {
  return createToken(readFloat32(data, pos + 1), 5, options);
}
function decodeFloat64(data, pos, _minor, options) {
  return createToken(readFloat64(data, pos + 1), 9, options);
}
function encodeFloat(buf2, token, options) {
  const float = token.value;
  if (float === false) {
    buf2.push([Type.float.majorEncoded | MINOR_FALSE]);
  } else if (float === true) {
    buf2.push([Type.float.majorEncoded | MINOR_TRUE]);
  } else if (float === null) {
    buf2.push([Type.float.majorEncoded | MINOR_NULL]);
  } else if (float === void 0) {
    buf2.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat16(float);
      decoded = readFloat16(ui8a, 1);
      if (float === decoded || Number.isNaN(float)) {
        ui8a[0] = 249;
        buf2.push(ui8a.slice(0, 3));
        success = true;
      } else {
        encodeFloat32(float);
        decoded = readFloat32(ui8a, 1);
        if (float === decoded) {
          ui8a[0] = 250;
          buf2.push(ui8a.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat64(float);
      decoded = readFloat64(ui8a, 1);
      ui8a[0] = 251;
      buf2.push(ui8a.slice(0, 9));
    }
  }
}
encodeFloat.encodedSize = function encodedSize8(token, options) {
  const float = token.value;
  if (float === false || float === true || float === null || float === void 0) {
    return 1;
  }
  if (!options || options.float64 !== true) {
    encodeFloat16(float);
    let decoded = readFloat16(ui8a, 1);
    if (float === decoded || Number.isNaN(float)) {
      return 3;
    }
    encodeFloat32(float);
    decoded = readFloat32(ui8a, 1);
    if (float === decoded) {
      return 5;
    }
  }
  return 9;
};
var buffer = new ArrayBuffer(9);
var dataView = new DataView(buffer, 1);
var ui8a = new Uint8Array(buffer, 0);
function encodeFloat16(inp) {
  if (inp === Infinity) {
    dataView.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView.setUint16(0, 32256, false);
  } else {
    dataView.setFloat32(0, inp);
    const valu32 = dataView.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView.setUint16(
        0,
        ((inp & 2147483648) >> 16) | (mantissa >> 13),
        false
      );
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView.setUint16(
          0,
          ((valu32 & 2147483648) >> 16) | (1 << (24 + logicalExponent)),
          false
        );
      } else {
        dataView.setUint16(
          0,
          ((valu32 & 2147483648) >> 16) |
            ((logicalExponent + 15) << 10) |
            (mantissa >> 13),
          false
        );
      }
    }
  }
}
function readFloat16(ui8a2, pos) {
  if (ui8a2.length - pos < 2) {
    throw new Error(`${decodeErrPrefix} not enough data for float16`);
  }
  const half = (ui8a2[pos] << 8) + ui8a2[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = (half >> 10) & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat32(inp) {
  dataView.setFloat32(0, inp, false);
}
function readFloat32(ui8a2, pos) {
  if (ui8a2.length - pos < 4) {
    throw new Error(`${decodeErrPrefix} not enough data for float32`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat64(inp) {
  dataView.setFloat64(0, inp, false);
}
function readFloat64(ui8a2, pos) {
  if (ui8a2.length - pos < 8) {
    throw new Error(`${decodeErrPrefix} not enough data for float64`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 8).getFloat64(0, false);
}
encodeFloat.compareTokens = encodeUint.compareTokens;
function invalidMinor(data, pos, minor) {
  throw new Error(
    `${decodeErrPrefix} encountered invalid minor (${minor}) for major ${
      data[pos] >>> 5
    }`
  );
}
function errorer(msg) {
  return () => {
    throw new Error(`${decodeErrPrefix} ${msg}`);
  };
}
var jump = [];
for (let i = 0; i <= 23; i++) {
  jump[i] = invalidMinor;
}
jump[24] = decodeUint8;
jump[25] = decodeUint16;
jump[26] = decodeUint32;
jump[27] = decodeUint64;
jump[28] = invalidMinor;
jump[29] = invalidMinor;
jump[30] = invalidMinor;
jump[31] = invalidMinor;
for (let i = 32; i <= 55; i++) {
  jump[i] = invalidMinor;
}
jump[56] = decodeNegint8;
jump[57] = decodeNegint16;
jump[58] = decodeNegint32;
jump[59] = decodeNegint64;
jump[60] = invalidMinor;
jump[61] = invalidMinor;
jump[62] = invalidMinor;
jump[63] = invalidMinor;
for (let i = 64; i <= 87; i++) {
  jump[i] = decodeBytesCompact;
}
jump[88] = decodeBytes8;
jump[89] = decodeBytes16;
jump[90] = decodeBytes32;
jump[91] = decodeBytes64;
jump[92] = invalidMinor;
jump[93] = invalidMinor;
jump[94] = invalidMinor;
jump[95] = errorer("indefinite length bytes/strings are not supported");
for (let i = 96; i <= 119; i++) {
  jump[i] = decodeStringCompact;
}
jump[120] = decodeString8;
jump[121] = decodeString16;
jump[122] = decodeString32;
jump[123] = decodeString64;
jump[124] = invalidMinor;
jump[125] = invalidMinor;
jump[126] = invalidMinor;
jump[127] = errorer("indefinite length bytes/strings are not supported");
for (let i = 128; i <= 151; i++) {
  jump[i] = decodeArrayCompact;
}
jump[152] = decodeArray8;
jump[153] = decodeArray16;
jump[154] = decodeArray32;
jump[155] = decodeArray64;
jump[156] = invalidMinor;
jump[157] = invalidMinor;
jump[158] = invalidMinor;
jump[159] = decodeArrayIndefinite;
for (let i = 160; i <= 183; i++) {
  jump[i] = decodeMapCompact;
}
jump[184] = decodeMap8;
jump[185] = decodeMap16;
jump[186] = decodeMap32;
jump[187] = decodeMap64;
jump[188] = invalidMinor;
jump[189] = invalidMinor;
jump[190] = invalidMinor;
jump[191] = decodeMapIndefinite;
for (let i = 192; i <= 215; i++) {
  jump[i] = decodeTagCompact;
}
jump[216] = decodeTag8;
jump[217] = decodeTag16;
jump[218] = decodeTag32;
jump[219] = decodeTag64;
jump[220] = invalidMinor;
jump[221] = invalidMinor;
jump[222] = invalidMinor;
jump[223] = invalidMinor;
for (let i = 224; i <= 243; i++) {
  jump[i] = errorer("simple values are not supported");
}
jump[244] = invalidMinor;
jump[245] = invalidMinor;
jump[246] = invalidMinor;
jump[247] = decodeUndefined;
jump[248] = errorer("simple values are not supported");
jump[249] = decodeFloat16;
jump[250] = decodeFloat32;
jump[251] = decodeFloat64;
jump[252] = invalidMinor;
jump[253] = invalidMinor;
jump[254] = invalidMinor;
jump[255] = decodeBreak;
var quick = [];
for (let i = 0; i < 24; i++) {
  quick[i] = new Token(Type.uint, i, 1);
}
for (let i = -1; i >= -24; i--) {
  quick[31 - i] = new Token(Type.negint, i, 1);
}
quick[64] = new Token(Type.bytes, new Uint8Array(0), 1);
quick[96] = new Token(Type.string, "", 1);
quick[128] = new Token(Type.array, 0, 1);
quick[160] = new Token(Type.map, 0, 1);
quick[244] = new Token(Type.false, false, 1);
quick[245] = new Token(Type.true, true, 1);
quick[246] = new Token(Type.null, null, 1);
function quickEncodeToken(token) {
  switch (token.type) {
    case Type.false:
      return fromArray([244]);
    case Type.true:
      return fromArray([245]);
    case Type.null:
      return fromArray([246]);
    case Type.bytes:
      if (!token.value.length) {
        return fromArray([64]);
      }
      return;
    case Type.string:
      if (token.value === "") {
        return fromArray([96]);
      }
      return;
    case Type.array:
      if (token.value === 0) {
        return fromArray([128]);
      }
      return;
    case Type.map:
      if (token.value === 0) {
        return fromArray([160]);
      }
      return;
    case Type.uint:
      if (token.value < 24) {
        return fromArray([Number(token.value)]);
      }
      return;
    case Type.negint:
      if (token.value >= -24) {
        return fromArray([31 - Number(token.value)]);
      }
  }
}
var defaultEncodeOptions = {
  float64: false,
  mapSorter,
  quickEncodeToken,
};
function makeCborEncoders() {
  const encoders = [];
  encoders[Type.uint.major] = encodeUint;
  encoders[Type.negint.major] = encodeNegint;
  encoders[Type.bytes.major] = encodeBytes;
  encoders[Type.string.major] = encodeString;
  encoders[Type.array.major] = encodeArray;
  encoders[Type.map.major] = encodeMap;
  encoders[Type.tag.major] = encodeTag;
  encoders[Type.float.major] = encodeFloat;
  return encoders;
}
var cborEncoders = makeCborEncoders();
var buf = new Bl();
var Ref = class _Ref {
  constructor(obj, parent) {
    this.obj = obj;
    this.parent = parent;
  }
  includes(obj) {
    let p = this;
    do {
      if (p.obj === obj) {
        return true;
      }
    } while ((p = p.parent));
    return false;
  }
  static createCheck(stack, obj) {
    if (stack && stack.includes(obj)) {
      throw new Error(`${encodeErrPrefix} object contains circular references`);
    }
    return new _Ref(obj, stack);
  }
};
var simpleTokens = {
  null: new Token(Type.null, null),
  undefined: new Token(Type.undefined, void 0),
  true: new Token(Type.true, true),
  false: new Token(Type.false, false),
  emptyArray: new Token(Type.array, 0),
  emptyMap: new Token(Type.map, 0),
};
var typeEncoders = {
  number(obj, _typ, _options, _refStack) {
    if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
      return new Token(Type.float, obj);
    } else if (obj >= 0) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  bigint(obj, _typ, _options, _refStack) {
    if (obj >= BigInt(0)) {
      return new Token(Type.uint, obj);
    } else {
      return new Token(Type.negint, obj);
    }
  },
  Uint8Array(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, obj);
  },
  string(obj, _typ, _options, _refStack) {
    return new Token(Type.string, obj);
  },
  boolean(obj, _typ, _options, _refStack) {
    return obj ? simpleTokens.true : simpleTokens.false;
  },
  null(_obj, _typ, _options, _refStack) {
    return simpleTokens.null;
  },
  undefined(_obj, _typ, _options, _refStack) {
    return simpleTokens.undefined;
  },
  ArrayBuffer(obj, _typ, _options, _refStack) {
    return new Token(Type.bytes, new Uint8Array(obj));
  },
  DataView(obj, _typ, _options, _refStack) {
    return new Token(
      Type.bytes,
      new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength)
    );
  },
  Array(obj, _typ, options, refStack) {
    if (!obj.length) {
      if (options.addBreakTokens === true) {
        return [simpleTokens.emptyArray, new Token(Type.break)];
      }
      return simpleTokens.emptyArray;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const e of obj) {
      entries[i++] = objectToTokens(e, options, refStack);
    }
    if (options.addBreakTokens) {
      return [
        new Token(Type.array, obj.length),
        entries,
        new Token(Type.break),
      ];
    }
    return [new Token(Type.array, obj.length), entries];
  },
  Object(obj, typ, options, refStack) {
    const isMap = typ !== "Object";
    const keys = isMap ? obj.keys() : Object.keys(obj);
    const length = isMap ? obj.size : keys.length;
    if (!length) {
      if (options.addBreakTokens === true) {
        return [simpleTokens.emptyMap, new Token(Type.break)];
      }
      return simpleTokens.emptyMap;
    }
    refStack = Ref.createCheck(refStack, obj);
    const entries = [];
    let i = 0;
    for (const key of keys) {
      entries[i++] = [
        objectToTokens(key, options, refStack),
        objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack),
      ];
    }
    sortMapEntries(entries, options);
    if (options.addBreakTokens) {
      return [new Token(Type.map, length), entries, new Token(Type.break)];
    }
    return [new Token(Type.map, length), entries];
  },
};
typeEncoders.Map = typeEncoders.Object;
typeEncoders.Buffer = typeEncoders.Uint8Array;
for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(
  " "
)) {
  typeEncoders[`${typ}Array`] = typeEncoders.DataView;
}
function objectToTokens(obj, options = {}, refStack) {
  const typ = is(obj);
  const customTypeEncoder =
    (options && options.typeEncoders && options.typeEncoders[typ]) ||
    typeEncoders[typ];
  if (typeof customTypeEncoder === "function") {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders[typ];
  if (!typeEncoder) {
    throw new Error(`${encodeErrPrefix} unsupported type: ${typ}`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn(
      "WARNING: complex key types used, CBOR key sorting guarantees are gone"
    );
  }
  return tcmp;
}
function tokensToEncoded(buf2, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded(buf2, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf2, tokens, options);
  }
}
function encodeCustom(data, encoders, options) {
  const tokens = objectToTokens(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf2 = new Bl(size);
      encoder(buf2, tokens, options);
      if (buf2.chunks.length !== 1) {
        throw new Error(
          `Unexpected error: pre-calculated length for ${tokens} was wrong`
        );
      }
      return asU8A(buf2.chunks[0]);
    }
  }
  buf.reset();
  tokensToEncoded(buf, tokens, encoders, options);
  return buf.toBytes(true);
}
function encode2(data, options) {
  options = Object.assign({}, defaultEncodeOptions, options);
  return encodeCustom(data, cborEncoders, options);
}
var defaultDecodeOptions = {
  strict: false,
  allowIndefinite: true,
  allowUndefined: true,
  allowBigInt: true,
};
var Tokeniser = class {
  constructor(data, options = {}) {
    this.pos = 0;
    this.data = data;
    this.options = options;
  }
  done() {
    return this.pos >= this.data.length;
  }
  next() {
    const byt = this.data[this.pos];
    let token = quick[byt];
    if (token === void 0) {
      const decoder = jump[byt];
      if (!decoder) {
        throw new Error(
          `${decodeErrPrefix} no decoder for major type ${
            byt >>> 5
          } (byte 0x${byt.toString(16).padStart(2, "0")})`
        );
      }
      const minor = byt & 31;
      token = decoder(this.data, this.pos, minor, this.options);
    }
    this.pos += token.encodedLength;
    return token;
  }
};
var DONE = Symbol.for("DONE");
var BREAK = Symbol.for("BREAK");
function tokenToArray(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject(tokeniser, options);
    if (value === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(
        `${decodeErrPrefix} got unexpected break to lengthed array`
      );
    }
    if (value === DONE) {
      throw new Error(
        `${decodeErrPrefix} found array but not enough entries (got ${i}, expected ${token.value})`
      );
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? void 0 : {};
  const m = useMaps ? /* @__PURE__ */ new Map() : void 0;
  for (let i = 0; i < token.value; i++) {
    const key = tokensToObject(tokeniser, options);
    if (key === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(
        `${decodeErrPrefix} got unexpected break to lengthed map`
      );
    }
    if (key === DONE) {
      throw new Error(
        `${decodeErrPrefix} found map but not enough entries (got ${i} [no key], expected ${token.value})`
      );
    }
    if (useMaps !== true && typeof key !== "string") {
      throw new Error(
        `${decodeErrPrefix} non-string keys not supported (got ${typeof key})`
      );
    }
    if (options.rejectDuplicateMapKeys === true) {
      if ((useMaps && m.has(key)) || (!useMaps && key in obj)) {
        throw new Error(`${decodeErrPrefix} found repeat map key "${key}"`);
      }
    }
    const value = tokensToObject(tokeniser, options);
    if (value === DONE) {
      throw new Error(
        `${decodeErrPrefix} found map but not enough entries (got ${i} [no value], expected ${token.value})`
      );
    }
    if (useMaps) {
      m.set(key, value);
    } else {
      obj[key] = value;
    }
  }
  return useMaps ? m : obj;
}
function tokensToObject(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE;
  }
  const token = tokeniser.next();
  if (token.type === Type.break) {
    return BREAK;
  }
  if (token.type.terminal) {
    return token.value;
  }
  if (token.type === Type.array) {
    return tokenToArray(token, tokeniser, options);
  }
  if (token.type === Type.map) {
    return tokenToMap(token, tokeniser, options);
  }
  if (token.type === Type.tag) {
    if (options.tags && typeof options.tags[token.value] === "function") {
      const tagged = tokensToObject(tokeniser, options);
      return options.tags[token.value](tagged);
    }
    throw new Error(`${decodeErrPrefix} tag not supported (${token.value})`);
  }
  throw new Error("unsupported");
}
function decode2(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${decodeErrPrefix} data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions, options);
  const tokeniser = options.tokenizer || new Tokeniser(data, options);
  const decoded = tokensToObject(tokeniser, options);
  if (decoded === DONE) {
    throw new Error(`${decodeErrPrefix} did not find any content to decode`);
  }
  if (decoded === BREAK) {
    throw new Error(`${decodeErrPrefix} got unexpected break`);
  }
  if (!tokeniser.done()) {
    throw new Error(
      `${decodeErrPrefix} too many terminals, data makes no sense`
    );
  }
  return decoded;
}
var CBOR_PREFIX_BASE = new Uint8Array([217, 93, 0]);
var CBOR_PREFIX_DERIVED = new Uint8Array([217, 93, 1]);
function parseBaseProofValue({ proof } = {}) {
  try {
    if (typeof proof?.proofValue !== "string") {
      throw new TypeError('"proof.proofValue" must be a string.');
    }
    if (proof.proofValue[0] !== "u") {
      throw new Error("Only base64url multibase encoding is supported.");
    }
    const proofValue = decode(proof.proofValue.slice(1));
    if (!_startsWithBytes(proofValue, CBOR_PREFIX_BASE)) {
      throw new TypeError('"proof.proofValue" must be a base proof.');
    }
    const payload = proofValue.subarray(CBOR_PREFIX_BASE.length);
    const [baseSignature, publicKey, hmacKey, signatures, mandatoryPointers] =
      decode2(payload, { useMaps: true });
    const params = {
      baseSignature,
      publicKey,
      hmacKey,
      signatures,
      mandatoryPointers,
    };
    _validateBaseProofParams(params);
    return params;
  } catch (e) {
    const err = new TypeError(
      'The proof does not include a valid "proofValue" property.'
    );
    err.cause = e;
    throw err;
  }
}
function parseDisclosureProofValue({ proof } = {}) {
  try {
    if (typeof proof?.proofValue !== "string") {
      throw new TypeError('"proof.proofValue" must be a string.');
    }
    if (proof.proofValue[0] !== "u") {
      throw new Error("Only base64url multibase encoding is supported.");
    }
    const proofValue = decode(proof.proofValue.slice(1));
    if (!_startsWithBytes(proofValue, CBOR_PREFIX_DERIVED)) {
      throw new TypeError('"proof.proofValue" must be a derived proof.');
    }
    const payload = proofValue.subarray(CBOR_PREFIX_DERIVED.length);
    const [
      baseSignature,
      publicKey,
      signatures,
      compressedLabelMap,
      mandatoryIndexes,
    ] = decode2(payload, { useMaps: true });
    const labelMap = _decompressLabelMap(compressedLabelMap);
    const params = {
      baseSignature,
      publicKey,
      signatures,
      labelMap,
      mandatoryIndexes,
    };
    _validateDerivedProofParams(params);
    return params;
  } catch (e) {
    const err = new TypeError(
      'The proof does not include a valid "proofValue" property.'
    );
    err.cause = e;
    throw err;
  }
}
function serializeBaseProofValue({
  baseSignature,
  publicKey,
  hmacKey,
  signatures,
  mandatoryPointers,
} = {}) {
  _validateBaseProofParams({
    baseSignature,
    publicKey,
    hmacKey,
    signatures,
    mandatoryPointers,
  });
  const payload = [
    // Uint8Array
    baseSignature,
    // Uint8Array
    publicKey,
    // Uint8Array
    hmacKey,
    // array of Uint8Arrays
    signatures,
    // array of strings
    mandatoryPointers,
  ];
  const cbor = _concatBuffers([CBOR_PREFIX_BASE, encode2(payload)]);
  return `u${encode(cbor)}`;
}
function serializeBaseVerifyData({ proofHash, publicKey, mandatoryHash } = {}) {
  _validateBaseVerifyDataParams({ proofHash, publicKey, mandatoryHash });
  const verifyData = _concatBuffers([proofHash, publicKey, mandatoryHash]);
  return verifyData;
}
function serializeDisclosureProofValue({
  baseSignature,
  publicKey,
  signatures,
  labelMap,
  mandatoryIndexes,
} = {}) {
  _validateDerivedProofParams({
    baseSignature,
    publicKey,
    signatures,
    labelMap,
    mandatoryIndexes,
  });
  const payload = [
    // Uint8Array
    baseSignature,
    // Uint8Array
    publicKey,
    // array of Uint8Arrays
    signatures,
    // Map of strings => strings compressed to ints => Uint8Arrays
    _compressLabelMap(labelMap),
    // array of numbers
    mandatoryIndexes,
  ];
  const cbor = _concatBuffers([CBOR_PREFIX_DERIVED, encode2(payload)]);
  return `u${encode(cbor)}`;
}
function _compressLabelMap(labelMap) {
  const map = /* @__PURE__ */ new Map();
  for (const [k, v] of labelMap.entries()) {
    map.set(parseInt(k.slice(4), 10), decode(v.slice(1)));
  }
  return map;
}
function _concatBuffers(buffers) {
  const bytes = new Uint8Array(buffers.reduce((acc, b) => acc + b.length, 0));
  let offset = 0;
  for (const b of buffers) {
    bytes.set(b, offset);
    offset += b.length;
  }
  return bytes;
}
function _decompressLabelMap(compressedLabelMap) {
  const map = /* @__PURE__ */ new Map();
  for (const [k, v] of compressedLabelMap.entries()) {
    map.set(`c14n${k}`, `u${encode(v)}`);
  }
  return map;
}
function _startsWithBytes(buffer2, prefix) {
  for (let i = 0; i < prefix.length; ++i) {
    if (buffer2[i] !== prefix[i]) {
      return false;
    }
  }
  return true;
}
function _validateBaseProofParams({
  baseSignature,
  publicKey,
  hmacKey,
  signatures,
  mandatoryPointers,
}) {
  if (!(baseSignature instanceof Uint8Array && baseSignature.length === 64)) {
    throw new TypeError('"baseSignature" must be a Uint8Array of length 64.');
  }
  if (!(publicKey instanceof Uint8Array && publicKey.length === 36)) {
    throw new TypeError('"publicKey" must be a Uint8Array of length 36.');
  }
  if (!(hmacKey instanceof Uint8Array && hmacKey.length === 32)) {
    throw new TypeError('"hmacKey" must be a Uint8Array of length 32.');
  }
  if (
    !(
      Array.isArray(signatures) &&
      signatures.every((s) => s instanceof Uint8Array && s.length === 64)
    )
  ) {
    throw new TypeError(
      '"signatures" must be an array of Uint8Arrays, each of length 64.'
    );
  }
  if (
    !(
      Array.isArray(mandatoryPointers) &&
      mandatoryPointers.every((p) => typeof p === "string")
    )
  ) {
    throw new TypeError('"mandatoryPointers" must be an array of strings.');
  }
}
function _validateBaseVerifyDataParams({
  proofHash,
  publicKey,
  mandatoryHash,
}) {
  if (!(proofHash instanceof Uint8Array && proofHash.length === 32)) {
    throw new TypeError('"proofHash" must be a Uint8Array of length 32.');
  }
  if (!(publicKey instanceof Uint8Array && publicKey.length === 36)) {
    throw new TypeError('"publicKey" must be a Uint8Array of length 36.');
  }
  if (!(mandatoryHash instanceof Uint8Array && mandatoryHash.length === 32)) {
    throw new TypeError('"mandatoryHash" must be a Uint8Array of length 32.');
  }
}
function _validateDerivedProofParams({
  baseSignature,
  publicKey,
  signatures,
  labelMap,
  mandatoryIndexes,
}) {
  if (!(baseSignature instanceof Uint8Array && baseSignature.length === 64)) {
    throw new TypeError('"baseSignature" must be a Uint8Array of length 64.');
  }
  if (!(publicKey instanceof Uint8Array && publicKey.length === 36)) {
    throw new TypeError('"publicKey" must be a Uint8Array of length 36.');
  }
  if (
    !(
      Array.isArray(signatures) &&
      signatures.every((s) => s instanceof Uint8Array)
    )
  ) {
    throw new TypeError('"signatures" must be an array of Uint8Arrays.');
  }
  if (
    !(
      labelMap instanceof Map &&
      [...labelMap.entries()].every(
        ([k, v]) => typeof k === "string" && typeof v === "string"
      )
    )
  ) {
    throw new TypeError('"labelMap" must be a Map of strings to strings.');
  }
  if (
    !(
      Array.isArray(mandatoryIndexes) &&
      mandatoryIndexes.every(Number.isInteger)
    )
  ) {
    throw new TypeError('"mandatoryPointers" must be an array of integers.');
  }
}
var name = "ecdsa-sd-2023";
var requiredAlgorithm = "P-256";
var VC_CTX_V1 = "https://www.w3.org/2018/credentials/v1";
var VC_CTX_V2 = "https://www.w3.org/ns/credentials/v2";
function createDiscloseCryptosuite({ proofId, selectivePointers = [] } = {}) {
  const options = { proofId, selectivePointers };
  return {
    name,
    requiredAlgorithm,
    createVerifier: _throwDeriveUsageError,
    createVerifyData: _throwDeriveUsageError,
    createProofValue: _throwDeriveUsageError,
    derive: _derive,
    options,
  };
}
async function _createDisclosureData({
  cryptosuite,
  document,
  proof,
  documentLoader,
}) {
  if (cryptosuite?.name !== name) {
    throw new TypeError(`"cryptosuite.name" must be "${name}".`);
  }
  if (!(cryptosuite.options && typeof cryptosuite.options === "object")) {
    throw new TypeError(`"cryptosuite.options" must be an object.`);
  }
  const { baseSignature, publicKey, hmacKey, signatures, mandatoryPointers } =
    await parseBaseProofValue({ proof });
  const hmac = await createHmac({ key: hmacKey });
  const options = { documentLoader };
  const nquads = await hmacIdCanonize({ document, options, hmac });
  const { selectivePointers = [] } = cryptosuite.options;
  const mandatoryFrame = pointersToFrame({
    document,
    pointers: mandatoryPointers,
  });
  const combinedFrame = pointersToFrame({
    document,
    pointers: mandatoryPointers.concat(selectivePointers),
  });
  if (!mandatoryFrame && !combinedFrame) {
    throw new Error("Nothing selected for disclosure.");
  }
  const [
    revealDoc,
    // get mandatory N-Quads using filtered index map (relative indexes will
    // be used) and non-mandatory using total index map (absolute indexes
    // will be used)
    {
      labelMap,
      filtered: { matching: relativeMandatory },
      matching: absoluteMandatory,
      nonMatching: nonMandatory,
    },
  ] = await Promise.all([
    frame(document, combinedFrame, options),
    filterAndGroup({
      nquads,
      filterFrame: combinedFrame,
      groupFrame: mandatoryFrame,
      options,
    }),
  ]);
  const mandatoryIndexes = [...relativeMandatory.keys()];
  let index = 0;
  const filteredSignatures = signatures.filter(() => {
    while (absoluteMandatory.has(index)) {
      index++;
    }
    return nonMandatory.has(index++);
  });
  return {
    baseSignature,
    publicKey,
    signatures: filteredSignatures,
    labelMap,
    mandatoryIndexes,
    revealDoc,
  };
}
async function _derive({
  cryptosuite,
  document,
  purpose,
  proofSet,
  documentLoader,
  dataIntegrityProof,
}) {
  const {
    options: { proofId },
  } = cryptosuite;
  const baseProof = _findProof({ proofId, proofSet, dataIntegrityProof });
  if (baseProof.proofPurpose !== purpose.term) {
    throw new Error(
      "Base proof purpose does not match purpose for derived proof."
    );
  }
  const {
    baseSignature,
    publicKey,
    signatures,
    labelMap,
    mandatoryIndexes,
    revealDoc,
  } = await _createDisclosureData({
    cryptosuite,
    document,
    proof: baseProof,
    documentLoader,
  });
  const newProof = { ...baseProof };
  newProof.proofValue = await serializeDisclosureProofValue({
    baseSignature,
    publicKey,
    signatures,
    labelMap,
    mandatoryIndexes,
  });
  delete newProof["@context"];
  revealDoc.proof = newProof;
  if (_isVC(revealDoc) && typeof revealDoc.credentialSubject === "string") {
    revealDoc.credentialSubject = { id: revealDoc.credentialSubject };
  }
  return revealDoc;
}
function _findProof({ proofId, proofSet, dataIntegrityProof }) {
  let proof;
  if (proofId) {
    proof = proofSet.find((p) => p.id === proofId);
  } else {
    for (const p of proofSet) {
      if (proof) {
        throw new Error(
          'Multiple matching proofs; a "proofId" must be specified.'
        );
      }
      if (dataIntegrityProof.matchProof({ proof: p })) {
        proof = p;
      }
    }
  }
  if (!proof) {
    throw new Error(
      "No matching base proof found from which to derive a disclosure proof."
    );
  }
  return proof;
}
function _throwDeriveUsageError() {
  throw new Error('This cryptosuite must only be used with "derive".');
}
function _isVC(document) {
  const context = document["@context"];
  if (Array.isArray(context)) {
    return context.includes(VC_CTX_V1) || context.includes(VC_CTX_V2);
  }
  return context === VC_CTX_V1 || context == VC_CTX_V2;
}
var _reverseAlphabets = {};
function encode3(input, alphabet2, maxline) {
  if (!(input instanceof Uint8Array)) {
    throw new TypeError('"input" must be a Uint8Array.');
  }
  if (typeof alphabet2 !== "string") {
    throw new TypeError('"alphabet" must be a string.');
  }
  if (maxline !== void 0 && typeof maxline !== "number") {
    throw new TypeError('"maxline" must be a number.');
  }
  if (input.length === 0) {
    return "";
  }
  let output = "";
  let i = 0;
  const base = alphabet2.length;
  const first = alphabet2.charAt(0);
  const digits = [0];
  for (i = 0; i < input.length; ++i) {
    let carry = input[i];
    for (let j = 0; j < digits.length; ++j) {
      carry += digits[j] << 8;
      digits[j] = carry % base;
      carry = (carry / base) | 0;
    }
    while (carry > 0) {
      digits.push(carry % base);
      carry = (carry / base) | 0;
    }
  }
  for (i = 0; input[i] === 0 && i < input.length - 1; ++i) {
    output += first;
  }
  for (i = digits.length - 1; i >= 0; --i) {
    output += alphabet2[digits[i]];
  }
  if (maxline) {
    const regex = new RegExp(".{1," + maxline + "}", "g");
    output = output.match(regex).join("\r\n");
  }
  return output;
}
function decode3(input, alphabet2) {
  if (typeof input !== "string") {
    throw new TypeError('"input" must be a string.');
  }
  if (typeof alphabet2 !== "string") {
    throw new TypeError('"alphabet" must be a string.');
  }
  if (input.length === 0) {
    return new Uint8Array();
  }
  let table = _reverseAlphabets[alphabet2];
  if (!table) {
    table = _reverseAlphabets[alphabet2] = [];
    for (let i = 0; i < alphabet2.length; ++i) {
      table[alphabet2.charCodeAt(i)] = i;
    }
  }
  input = input.replace(/\s/g, "");
  const base = alphabet2.length;
  const first = alphabet2.charAt(0);
  const bytes = [0];
  for (let i = 0; i < input.length; i++) {
    const value = table[input.charCodeAt(i)];
    if (value === void 0) {
      return;
    }
    let carry = value;
    for (let j = 0; j < bytes.length; ++j) {
      carry += bytes[j] * base;
      bytes[j] = carry & 255;
      carry >>= 8;
    }
    while (carry > 0) {
      bytes.push(carry & 255);
      carry >>= 8;
    }
  }
  for (let k = 0; input[k] === first && k < input.length - 1; ++k) {
    bytes.push(0);
  }
  return new Uint8Array(bytes.reverse());
}
var alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function encode4(input, maxline) {
  return encode3(input, alphabet, maxline);
}
function decode4(input) {
  return decode3(input, alphabet);
}
var ALGORITHM = "ECDSA";
var EXTRACTABLE = true;
var ECDSA_2019_SECP_256_KEY_TYPE = "EcdsaSecp256r1VerificationKey2019";
var ECDSA_2019_SECP_384_KEY_TYPE = "EcdsaSecp384r1VerificationKey2019";
var ECDSA_2019_SECP_521_KEY_TYPE = "EcdsaSecp521r1VerificationKey2019";
var ECDSA_2019_SUITE_CONTEXT_V1_URL =
  "https://w3id.org/security/suites/ecdsa-2019/v1";
var MULTIKEY_CONTEXT_V1_URL = "https://w3id.org/security/multikey/v1";
var MULTIBASE_BASE58_HEADER = "z";
var MULTICODEC_P256_PUBLIC_KEY_HEADER = new Uint8Array([128, 36]);
var MULTICODEC_P384_PUBLIC_KEY_HEADER = new Uint8Array([129, 36]);
var MULTICODEC_P521_PUBLIC_KEY_HEADER = new Uint8Array([130, 36]);
var MULTICODEC_P256_SECRET_KEY_HEADER = new Uint8Array([134, 38]);
var MULTICODEC_P384_SECRET_KEY_HEADER = new Uint8Array([135, 38]);
var MULTICODEC_P521_SECRET_KEY_HEADER = new Uint8Array([136, 38]);
var ECDSA_CURVE = {
  P256: "P-256",
  P384: "P-384",
  P521: "P-521",
};
var ECDSA_HASH = {
  SHA256: "SHA-256",
  SHA384: "SHA-384",
  SHA512: "SHA-512",
};
var import_node_crypto3 = crypto; //import("https://deno.land/std@0.192.0/crypto/mod.ts");
var CryptoKey = globalThis.CryptoKey ?? import_node_crypto3.webcrypto.CryptoKey;
function createSigner({ id, secretKey }) {
  if (!secretKey) {
    throw new Error('"secretKey" is required for signing.');
  }
  const { namedCurve: curve } = secretKey.algorithm;
  const algorithm = {
    name: ALGORITHM,
    hash: { name: _getEcdsaHash({ curve }) },
  };
  return {
    algorithm: curve,
    id,
    async sign({ data } = {}) {
      return new Uint8Array(
        await import_node_crypto3.webcrypto.subtle.sign(
          algorithm,
          secretKey,
          data
        )
      );
    },
  };
}
function createVerifier({ id, publicKey }) {
  if (!publicKey) {
    throw new Error('"publicKey" is required for verifying.');
  }
  const { namedCurve: curve } = publicKey.algorithm;
  const algorithm = {
    name: ALGORITHM,
    hash: { name: _getEcdsaHash({ curve }) },
  };
  return {
    algorithm: curve,
    id,
    async verify({ data, signature } = {}) {
      return import_node_crypto3.webcrypto.subtle.verify(
        algorithm,
        publicKey,
        signature,
        data
      );
    },
  };
}
function _getEcdsaHash({ curve }) {
  if (curve === ECDSA_CURVE.P256) {
    return ECDSA_HASH.SHA256;
  }
  if (curve === ECDSA_CURVE.P384) {
    return ECDSA_HASH.SHA384;
  }
  if (curve === ECDSA_CURVE.P521) {
    return ECDSA_HASH.SHA512;
  }
  throw new TypeError(`Unsupported curve "${curve}".`);
}
function getNamedCurveFromPublicMultikey({ publicMultikey }) {
  if (
    publicMultikey[0] === MULTICODEC_P256_PUBLIC_KEY_HEADER[0] &&
    publicMultikey[1] === MULTICODEC_P256_PUBLIC_KEY_HEADER[1]
  ) {
    return ECDSA_CURVE.P256;
  }
  if (
    publicMultikey[0] === MULTICODEC_P384_PUBLIC_KEY_HEADER[0] &&
    publicMultikey[1] === MULTICODEC_P384_PUBLIC_KEY_HEADER[1]
  ) {
    return ECDSA_CURVE.P384;
  }
  if (
    publicMultikey[0] === MULTICODEC_P521_PUBLIC_KEY_HEADER[0] &&
    publicMultikey[1] === MULTICODEC_P521_PUBLIC_KEY_HEADER[1]
  ) {
    return ECDSA_CURVE.P521;
  }
  throw new TypeError("Unsupported public multikey header.");
}
function getNamedCurveFromSecretMultikey({ secretMultikey }) {
  if (
    secretMultikey[0] === MULTICODEC_P256_SECRET_KEY_HEADER[0] &&
    secretMultikey[1] === MULTICODEC_P256_SECRET_KEY_HEADER[1]
  ) {
    return ECDSA_CURVE.P256;
  }
  if (
    secretMultikey[0] === MULTICODEC_P384_SECRET_KEY_HEADER[0] &&
    secretMultikey[1] === MULTICODEC_P384_SECRET_KEY_HEADER[1]
  ) {
    return ECDSA_CURVE.P384;
  }
  if (
    secretMultikey[0] === MULTICODEC_P521_SECRET_KEY_HEADER[0] &&
    secretMultikey[1] === MULTICODEC_P521_SECRET_KEY_HEADER[1]
  ) {
    return ECDSA_CURVE.P521;
  }
  throw new TypeError("Unsupported secret multikey header.");
}
function getSecretKeySize({ keyPair }) {
  const key = keyPair.secretKey || keyPair.publicKey;
  const { namedCurve: curve } = key.algorithm;
  if (curve === ECDSA_CURVE.P256) {
    return 32;
  }
  if (curve === ECDSA_CURVE.P384) {
    return 48;
  }
  if (curve === ECDSA_CURVE.P521) {
    return 66;
  }
  throw new TypeError(`Unsupported curve "${curve}".`);
}
function setSecretKeyHeader({ keyPair, buffer: buffer2 }) {
  const key = keyPair.secretKey || keyPair.publicKey;
  const { namedCurve: curve } = key.algorithm;
  if (curve === ECDSA_CURVE.P256) {
    buffer2[0] = MULTICODEC_P256_SECRET_KEY_HEADER[0];
    buffer2[1] = MULTICODEC_P256_SECRET_KEY_HEADER[1];
  } else if (curve === ECDSA_CURVE.P384) {
    buffer2[0] = MULTICODEC_P384_SECRET_KEY_HEADER[0];
    buffer2[1] = MULTICODEC_P384_SECRET_KEY_HEADER[1];
  } else if (curve === ECDSA_CURVE.P521) {
    buffer2[0] = MULTICODEC_P521_SECRET_KEY_HEADER[0];
    buffer2[1] = MULTICODEC_P521_SECRET_KEY_HEADER[1];
  } else {
    throw new TypeError(`Unsupported curve "${curve}".`);
  }
}
function setPublicKeyHeader({ keyPair, buffer: buffer2 }) {
  const { namedCurve: curve } = keyPair.publicKey.algorithm;
  if (curve === ECDSA_CURVE.P256) {
    buffer2[0] = MULTICODEC_P256_PUBLIC_KEY_HEADER[0];
    buffer2[1] = MULTICODEC_P256_PUBLIC_KEY_HEADER[1];
  } else if (curve === ECDSA_CURVE.P384) {
    buffer2[0] = MULTICODEC_P384_PUBLIC_KEY_HEADER[0];
    buffer2[1] = MULTICODEC_P384_PUBLIC_KEY_HEADER[1];
  } else if (curve === ECDSA_CURVE.P521) {
    buffer2[0] = MULTICODEC_P521_PUBLIC_KEY_HEADER[0];
    buffer2[1] = MULTICODEC_P521_PUBLIC_KEY_HEADER[1];
  } else {
    throw new TypeError(`Unsupported curve "${curve}".`);
  }
}
var PKCS8_PREFIXES = /* @__PURE__ */ new Map([
  [
    ECDSA_CURVE.P256,
    {
      secret: new Uint8Array([
        48, 103, 2, 1, 0, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42,
        134, 72, 206, 61, 3, 1, 7, 4, 77, 48, 75, 2, 1, 1, 4, 32,
      ]),
      public: new Uint8Array([161, 36, 3, 34, 0]),
    },
  ],
  [
    ECDSA_CURVE.P384,
    {
      secret: new Uint8Array([
        48, 129, 132, 2, 1, 0, 48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5,
        43, 129, 4, 0, 34, 4, 109, 48, 107, 2, 1, 1, 4, 48,
      ]),
      public: new Uint8Array([161, 52, 3, 50, 0]),
    },
  ],
  [
    ECDSA_CURVE.P521,
    {
      secret: new Uint8Array([
        48, 129, 170, 2, 1, 0, 48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5,
        43, 129, 4, 0, 35, 4, 129, 146, 48, 129, 143, 2, 1, 1, 4, 66,
      ]),
      public: new Uint8Array([161, 70, 3, 68, 0]),
    },
  ],
]);
var SPKI_PREFIXES = /* @__PURE__ */ new Map([
  [
    ECDSA_CURVE.P256,
    new Uint8Array([
      48, 57, 48, 19, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 8, 42, 134, 72, 206,
      61, 3, 1, 7, 3, 34, 0,
    ]),
  ],
  [
    ECDSA_CURVE.P384,
    new Uint8Array([
      48, 70, 48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 34,
      3, 50, 0,
    ]),
  ],
  [
    ECDSA_CURVE.P521,
    new Uint8Array([
      48, 88, 48, 16, 6, 7, 42, 134, 72, 206, 61, 2, 1, 6, 5, 43, 129, 4, 0, 35,
      3, 68, 0,
    ]),
  ],
]);
async function exportKeyPair({
  keyPair,
  secretKey,
  publicKey,
  includeContext,
} = {}) {
  if (!(publicKey || secretKey)) {
    throw new TypeError(
      'Export requires specifying either "publicKey" or "secretKey".'
    );
  }
  const useSecretKey = secretKey && !!keyPair.secretKey;
  const secretKeySize = getSecretKeySize({ keyPair });
  const cryptoKey = useSecretKey ? keyPair.secretKey : keyPair.publicKey;
  const jwk = await import_node_crypto3.webcrypto.subtle.exportKey(
    "jwk",
    cryptoKey
  );
  const exported = {};
  if (includeContext) {
    exported["@context"] = MULTIKEY_CONTEXT_V1_URL;
  }
  exported.id = keyPair.id;
  exported.type = "Multikey";
  exported.controller = keyPair.controller;
  if (publicKey) {
    const x = decode(jwk.x);
    const y = decode(jwk.y);
    const publicKeySize = secretKeySize + 1;
    const multikey = new Uint8Array(2 + publicKeySize);
    setPublicKeyHeader({ keyPair, buffer: multikey });
    const even = y[y.length - 1] % 2 === 0;
    multikey[2] = even ? 2 : 3;
    multikey.set(x, multikey.length - x.length);
    exported.publicKeyMultibase = MULTIBASE_BASE58_HEADER + encode4(multikey);
  }
  if (useSecretKey) {
    const d = decode(jwk.d);
    const multikey = new Uint8Array(2 + secretKeySize);
    setSecretKeyHeader({ keyPair, buffer: multikey });
    multikey.set(d, multikey.length - d.length);
    exported.secretKeyMultibase = MULTIBASE_BASE58_HEADER + encode4(multikey);
  }
  return exported;
}
async function importKeyPair({
  id,
  controller,
  secretKeyMultibase,
  publicKeyMultibase,
}) {
  if (!publicKeyMultibase) {
    throw new TypeError('The "publicKeyMultibase" property is required.');
  }
  const keyPair = { id, controller };
  if (
    !(
      publicKeyMultibase &&
      typeof publicKeyMultibase === "string" &&
      publicKeyMultibase[0] === MULTIBASE_BASE58_HEADER
    )
  ) {
    throw new TypeError(
      '"publicKeyMultibase" must be a multibase, base58-encoded string.'
    );
  }
  const publicMultikey = decode4(publicKeyMultibase.slice(1));
  const algorithm = {
    name: ALGORITHM,
    namedCurve: getNamedCurveFromPublicMultikey({ publicMultikey }),
  };
  const spki = _toSpki({ publicMultikey });
  keyPair.publicKey = await import_node_crypto3.webcrypto.subtle.importKey(
    "spki",
    spki,
    algorithm,
    EXTRACTABLE,
    ["verify"]
  );
  if (secretKeyMultibase) {
    if (
      !(
        typeof secretKeyMultibase === "string" &&
        secretKeyMultibase[0] === MULTIBASE_BASE58_HEADER
      )
    ) {
      throw new TypeError(
        '"secretKeyMultibase" must be a multibase, base58-encoded string.'
      );
    }
    const secretMultikey = decode4(secretKeyMultibase.slice(1));
    _ensureMultikeyHeadersMatch({ secretMultikey, publicMultikey });
    const pkcs8 = _toPkcs8({ secretMultikey, publicMultikey });
    keyPair.secretKey = await import_node_crypto3.webcrypto.subtle.importKey(
      "pkcs8",
      pkcs8,
      algorithm,
      EXTRACTABLE,
      ["sign"]
    );
  }
  return keyPair;
}
function _ensureMultikeyHeadersMatch({ secretMultikey, publicMultikey }) {
  const publicCurve = getNamedCurveFromPublicMultikey({ publicMultikey });
  const secretCurve = getNamedCurveFromSecretMultikey({ secretMultikey });
  if (publicCurve !== secretCurve) {
    throw new Error(
      `Public key curve ('${publicCurve}') does not match secret key curve ('${secretCurve}').`
    );
  }
}
function _toPkcs8({ secretMultikey, publicMultikey }) {
  const headers = PKCS8_PREFIXES.get(
    getNamedCurveFromPublicMultikey({ publicMultikey })
  );
  const pkcs8 = new Uint8Array(
    headers.secret.length + // do not include multikey 2-byte header
      secretMultikey.length -
      2 +
      headers.public.length + // do not include multikey 2-byte header
      publicMultikey.length -
      2
  );
  let offset = 0;
  pkcs8.set(headers.secret, offset);
  offset += headers.secret.length;
  pkcs8.set(secretMultikey.subarray(2), offset);
  offset += secretMultikey.length - 2;
  pkcs8.set(headers.public, offset);
  offset += headers.public.length;
  pkcs8.set(publicMultikey.subarray(2), offset);
  return pkcs8;
}
function _toSpki({ publicMultikey }) {
  const header = SPKI_PREFIXES.get(
    getNamedCurveFromPublicMultikey({ publicMultikey })
  );
  const spki = new Uint8Array(
    header.length + // do not include multikey 2-byte header
      publicMultikey.length -
      2
  );
  let offset = 0;
  spki.set(header, offset);
  offset += header.length;
  spki.set(publicMultikey.subarray(2), offset);
  return spki;
}
var VALID_ECDSA_TYPES = /* @__PURE__ */ new Set([
  ECDSA_2019_SECP_256_KEY_TYPE,
  ECDSA_2019_SECP_384_KEY_TYPE,
  ECDSA_2019_SECP_521_KEY_TYPE,
]);
async function toMultikey({ keyPair }) {
  if (!VALID_ECDSA_TYPES.has(keyPair.type)) {
    throw new TypeError(`Unsupported key type "${keyPair.type}".`);
  }
  if (!keyPair["@context"]) {
    keyPair["@context"] = ECDSA_2019_SUITE_CONTEXT_V1_URL;
  }
  if (
    !_includesContext({
      document: keyPair,
      contextUrl: ECDSA_2019_SUITE_CONTEXT_V1_URL,
    })
  ) {
    throw new TypeError(`Context not supported "${keyPair["@context"]}".`);
  }
  return {
    "@context": MULTIKEY_CONTEXT_V1_URL,
    id: keyPair.id,
    type: "Multikey",
    controller: keyPair.controller,
    publicKeyMultibase: keyPair.publicKeyMultibase,
    secretKeyMultibase: keyPair.secretKeyMultibase,
  };
}
function _includesContext({ document, contextUrl }) {
  const context = document["@context"];
  return (
    context === contextUrl ||
    (Array.isArray(context) && context.includes(contextUrl))
  );
}
async function generate({ id, controller, curve } = {}) {
  if (!curve) {
    throw new TypeError(
      `"curve" must be one of the following values: ${Object.values(ECDSA_CURVE)
        .map((v) => `'${v}'`)
        .join(", ")}.`
    );
  }
  const algorithm = { name: ALGORITHM, namedCurve: curve };
  const keyPair = await import_node_crypto3.webcrypto.subtle.generateKey(
    algorithm,
    EXTRACTABLE,
    ["sign", "verify"]
  );
  keyPair.secretKey = keyPair.privateKey;
  delete keyPair.privateKey;
  const keyPairInterface = await _createKeyPairInterface({ keyPair });
  const exportedKeyPair = await keyPairInterface.export({ publicKey: true });
  const { publicKeyMultibase } = exportedKeyPair;
  if (controller && !id) {
    id = `${controller}#${publicKeyMultibase}`;
  }
  keyPairInterface.id = id;
  keyPairInterface.controller = controller;
  return keyPairInterface;
}
async function from(key) {
  let multikey = { ...key };
  if (multikey.type && multikey.type !== "Multikey") {
    multikey = await toMultikey({ keyPair: multikey });
    return _createKeyPairInterface({ keyPair: multikey });
  }
  if (!multikey.type) {
    multikey.type = "Multikey";
  }
  if (!multikey["@context"]) {
    multikey["@context"] = MULTIKEY_CONTEXT_V1_URL;
  }
  if (multikey.controller && !multikey.id) {
    multikey.id = `${key.controller}#${key.publicKeyMultibase}`;
  }
  _assertMultikey(multikey);
  return _createKeyPairInterface({ keyPair: multikey });
}
async function _createKeyPairInterface({ keyPair }) {
  if (!(keyPair?.publicKey instanceof CryptoKey)) {
    keyPair = await importKeyPair(keyPair);
  }
  const exportFn = async ({
    publicKey = true,
    secretKey = false,
    includeContext = true,
  } = {}) => {
    return exportKeyPair({ keyPair, publicKey, secretKey, includeContext });
  };
  const { publicKeyMultibase, secretKeyMultibase } = await exportFn({
    publicKey: true,
    secretKey: true,
    includeContext: true,
  });
  keyPair = {
    ...keyPair,
    publicKeyMultibase,
    secretKeyMultibase,
    export: exportFn,
    signer() {
      const { id, secretKey } = keyPair;
      return createSigner({ id, secretKey });
    },
    verifier() {
      const { id, publicKey } = keyPair;
      return createVerifier({ id, publicKey });
    },
  };
  return keyPair;
}
function _assertMultikey(key) {
  if (!(key && typeof key === "object")) {
    throw new TypeError('"key" must be an object.');
  }
  if (key.type !== "Multikey") {
    throw new TypeError('"key" must be a Multikey with type "Multikey".');
  }
  if (key["@context"] !== MULTIKEY_CONTEXT_V1_URL) {
    throw new TypeError(
      `"key" must be a Multikey with context "${MULTIKEY_CONTEXT_V1_URL}".`
    );
  }
}
function createSignCryptosuite({ mandatoryPointers = [] } = {}) {
  const options = { mandatoryPointers };
  return {
    name,
    requiredAlgorithm,
    createVerifier: _throwSignUsageError,
    createVerifyData: _createSignData,
    createProofValue: _createBaseProofValue,
    options,
  };
}
async function _createBaseProofValue({ verifyData, dataIntegrityProof }) {
  const { signer } = dataIntegrityProof;
  const { proofHash, mandatoryPointers, mandatoryHash, nonMandatory, hmacKey } =
    verifyData;
  const localKeyPair = await generate({ curve: "P-256" });
  const { sign } = localKeyPair.signer();
  const signatures = await Promise.all(
    nonMandatory.map((nq) => sign({ data: stringToUtf8Bytes(nq) }))
  );
  const publicKey = decode4(localKeyPair.publicKeyMultibase);
  const toSign = await serializeBaseVerifyData({
    proofHash,
    publicKey,
    mandatoryHash,
  });
  const baseSignature = await signer.sign({ data: toSign });
  const proofValue = serializeBaseProofValue({
    baseSignature,
    publicKey,
    hmacKey,
    signatures,
    mandatoryPointers,
  });
  return proofValue;
}
async function _createSignData({
  cryptosuite,
  document,
  proof,
  documentLoader,
}) {
  if (cryptosuite?.name !== name) {
    throw new TypeError(`"cryptosuite.name" must be "${name}".`);
  }
  if (!(cryptosuite.options && typeof cryptosuite.options === "object")) {
    throw new TypeError(`"cryptosuite.options" must be an object.`);
  }
  const { mandatoryPointers = [] } = cryptosuite.options;
  if (!Array.isArray(mandatoryPointers)) {
    throw new TypeError(
      `"cryptosuite.options.mandatoryPointers" must be an array.`
    );
  }
  const options = { documentLoader };
  const proofHashPromise = hashCanonizedProof({
    document,
    proof,
    options,
  }).catch((e) => e);
  const hmac = await createHmac({ key: null });
  const nquads = await hmacIdCanonize({ document, options, hmac });
  const mandatoryFrame = pointersToFrame({
    document,
    pointers: mandatoryPointers,
  });
  const { matching, nonMatching } = await group({
    nquads,
    frame: mandatoryFrame,
    options,
  });
  const mandatory = [...matching.values()];
  const nonMandatory = [...nonMatching.values()];
  const { mandatoryHash } = await hashMandatory({ mandatory });
  const hmacKey = await hmac.export();
  const proofHash = await proofHashPromise;
  if (proofHash instanceof Error) {
    throw proofHash;
  }
  return { proofHash, mandatoryPointers, mandatoryHash, nonMandatory, hmacKey };
}
function _throwSignUsageError() {
  throw new Error('This cryptosuite must only be used with "sign".');
}
function createVerifyCryptosuite() {
  return {
    name,
    requiredAlgorithm,
    createVerifier: createVerifier2,
    createVerifyData: _createVerifyData,
  };
}
async function createVerifier2({ verificationMethod }) {
  const key = await from(verificationMethod);
  const verifier = key.verifier();
  return {
    algorithm: verifier.algorithm,
    id: verifier.id,
    // `data` includes `signature` in this cryptosuite
    async verify({ data }) {
      return _multiverify({ verifier, data });
    },
  };
}
async function _createVerifyData({
  cryptosuite,
  document,
  proof,
  documentLoader,
}) {
  if (cryptosuite?.name !== name) {
    throw new TypeError(`"cryptosuite.name" must be "${name}".`);
  }
  const options = { documentLoader };
  const proofHashPromise = hashCanonizedProof({
    document,
    proof,
    options,
  }).catch((e) => e);
  const { baseSignature, publicKey, signatures, labelMap, mandatoryIndexes } =
    await parseDisclosureProofValue({ proof });
  const nquads = await hmacIdCanonize({ document, options, labelMap });
  const mandatory = [];
  const nonMandatory = [];
  for (const [index, nq] of nquads.entries()) {
    if (mandatoryIndexes.includes(index)) {
      mandatory.push(nq);
    } else {
      nonMandatory.push(nq);
    }
  }
  const { mandatoryHash } = await hashMandatory({ mandatory });
  const proofHash = await proofHashPromise;
  if (proofHash instanceof Error) {
    throw proofHash;
  }
  return {
    baseSignature,
    proofHash,
    publicKey,
    signatures,
    nonMandatory,
    mandatoryHash,
  };
}
async function _multiverify({ verifier, data } = {}) {
  const {
    baseSignature,
    proofHash,
    publicKey,
    signatures,
    nonMandatory,
    mandatoryHash,
  } = data;
  const publicKeyMultibase = encode4(publicKey);
  const localKeyPair = await from({ publicKeyMultibase });
  if (signatures.length !== nonMandatory.length) {
    throw new Error(
      `Signature count (${signatures.length}) does not match non-mandatory message count (${nonMandatory.length}).`
    );
  }
  const { verify } = localKeyPair.verifier();
  const results = await Promise.all(
    signatures.map((signature, index) =>
      verify({
        data: stringToUtf8Bytes(nonMandatory[index]),
        signature,
      })
    )
  );
  if (results.some((r) => !r)) {
    return false;
  }
  const toVerify = await serializeBaseVerifyData({
    proofHash,
    publicKey,
    mandatoryHash,
  });
  return verifier.verify({ data: toVerify, signature: baseSignature });
}

// verifyzk.ts
var verifyPresentation = async (verifiablePresentation) => {
  const json = JSON.parse('{ "data":{}, "verified":"true" }');
  const response = {
    data: JSON.stringify(json),
    verified: json.verified,
  };
  LitActions.setResponse({
    response: JSON.stringify(response),
  });
};
verifyPresentation(presentation);
/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
/*!
 * Copyright (c) 2022-2023 Digital Bazaar, Inc. All rights reserved.
 */
/*!
 * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
 */
/*! Bundled license information:

rdf-canonize/lib/Permuter.js:
  (*!
   * Copyright (c) 2016-2022 Digital Bazaar, Inc. All rights reserved.
   *)

rdf-canonize/lib/NQuads.js:
  (*!
   * Copyright (c) 2016-2022 Digital Bazaar, Inc. All rights reserved.
   *)

rdf-canonize/lib/URDNA2015.js:
  (*!
   * Copyright (c) 2016-2022 Digital Bazaar, Inc. All rights reserved.
   *)

rdf-canonize/lib/URGNA2012.js:
  (*!
   * Copyright (c) 2016-2022 Digital Bazaar, Inc. All rights reserved.
   *)

rdf-canonize/lib/URDNA2015Sync.js:
  (*!
   * Copyright (c) 2016-2022 Digital Bazaar, Inc. All rights reserved.
   *)

rdf-canonize/lib/URGNA2012Sync.js:
  (*!
   * Copyright (c) 2016-2021 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/http-client/dist/cjs/index.cjs:
  (*!
   * Copyright (c) 2022 Digital Bazaar, Inc. All rights reserved.
   *)
  (*!
   * Copyright (c) 2020-2022 Digital Bazaar, Inc. All rights reserved.
   *)

jsonld/lib/context.js:
  (* disallow aliasing @context and @preserve *)

jsonld/lib/frame.js:
  (* remove @preserve from results *)
  (**
   * Removes the @preserve keywords from expanded result of framing.
   *
   * @param input the framed, framed output.
   * @param options the framing options used.
   *
   * @return the resulting output.
   *)
  (* remove @preserve *)

jsonld/lib/jsonld.js:
  (**
   * A JavaScript implementation of the JSON-LD API.
   *
   * @author Dave Longley
   *
   * @license BSD 3-Clause License
   * Copyright (c) 2011-2022 Digital Bazaar, Inc.
   * All rights reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions are met:
   *
   * Redistributions of source code must retain the above copyright notice,
   * this list of conditions and the following disclaimer.
   *
   * Redistributions in binary form must reproduce the above copyright
   * notice, this list of conditions and the following disclaimer in the
   * documentation and/or other materials provided with the distribution.
   *
   * Neither the name of the Digital Bazaar, Inc. nor the names of its
   * contributors may be used to endorse or promote products derived from
   * this software without specific prior written permission.
   *
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
   * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
   * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
   * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
   * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
   * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
   * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *)

@digitalbazaar/di-sd-primitives/lib/skolemize.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

base64url-universal/lib/index.js:
  (*!
   * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/hash.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/helpers.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/canonize.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/hmac.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/frame.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/filter.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/mandatory.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/pointer.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/di-sd-primitives/lib/index.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

base58-universal/lib/index.js:
  (*!
   * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/ecdsa-multikey/lib/constants.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/ecdsa-multikey/lib/crypto.js:
  (*!
   * Copyright (c) 2019-2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/ecdsa-multikey/lib/factory.js:
  (*!
   * Copyright (c) 2022-2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/ecdsa-multikey/lib/helpers.js:
  (*!
   * Copyright (c) 2022-2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/ecdsa-multikey/lib/serialize.js:
  (*!
   * Copyright (c) 2022-2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/ecdsa-multikey/lib/translators.js:
  (*!
   * Copyright (c) 2023 Digital Bazaar, Inc. All rights reserved.
   *)

@digitalbazaar/ecdsa-multikey/lib/index.js:
  (*!
   * Copyright (c) 2022-2023 Digital Bazaar, Inc. All rights reserved.
   *)
*/
