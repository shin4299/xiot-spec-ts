import {UrnType, UrnTypeFromString} from './UrnType';

export class Urn {
  private ns: string;
  private type: UrnType;
  private name: string;
  private value: number;
  private isModified: boolean;
  private modified: string;

  constructor() {
  }

  // constructor(namespace: string,
  //             type: UrnType,
  //             name: string,
  //             value: string) {
  //   this.ns = namespace;
  //   this.type = type;
  //   this.name = name;
  //   this.value = Number.parseInt(value, 16);
  //   this.isModified = false;
  // }
  //
  // constructor(ns: string,
  //             type: UrnType,
  //             name: string,
  //             value: number) {
  //   this.ns = ns;
  //   this.type = type;
  //   this.name = name;
  //   this.value = value;
  //   this.isModified = false;
  // }

  parseString(string: string): boolean {
    let ret: boolean;

    do {
      const a = string.split(':');
      if (a.length !== 5 && a.length !== 6) {
        break;
      }

      if (a[0] !== 'urn') {
        break;
      }

      this.ns = a[1];
      this.type = UrnTypeFromString(a[2]);
      this.name = a[3];
      this.value = Number.parseInt(a[4], 16);
      this.isModified = (a.length === 6);

      if (this.isModified) {
        this.modified = a[5];
      }

      ret = true;
    } while (false);

    return ret;
  }

  parse(theType: UrnType, string: string): boolean {
    return this.parseString(string) && this.validateType(theType);
  }

  validateType(theType: UrnType): boolean {
    return (this.type === theType);
  }
}