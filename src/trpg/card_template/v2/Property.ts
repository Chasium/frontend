/**
 * 属性类型
 */
export enum PropertyType {
    INT,
    FLOAT,
    BOOL,
    STRING,
    SELECTION,
    CALCULATED_INT,
    CALCULATED_FLOAT,
    CALCULATED_BOOL,
    CALCULATED_STRING,
    IMAGE,
    BUTTON,
}

export interface IProperty {
    type: PropertyType;
    id: number;
    nameScriptId: number;
}

export interface IBasicProperty extends IProperty {
    type:
        | PropertyType.INT
        | PropertyType.FLOAT
        | PropertyType.BOOL
        | PropertyType.STRING;
    needCheck: boolean;
    checkScriptId: number;
}

export interface IIntProperty extends IBasicProperty {
    type: PropertyType.INT;
}

export interface IFloatProperty extends IBasicProperty {
    type: PropertyType.FLOAT;
    precisionScriptId: number;
}

export interface IBoolProperty extends IBasicProperty {
    type: PropertyType.BOOL;
}

export interface IStringProperty extends IBasicProperty {
    type: PropertyType.STRING;
}

export interface ISelectionProperty extends IProperty {
    type: PropertyType.SELECTION;
    valueClassScriptId: number;
    needCheck: boolean;
    checkScriptId: number;
}

export interface ICalculatedProperty extends IProperty {
    type:
        | PropertyType.CALCULATED_INT
        | PropertyType.CALCULATED_FLOAT
        | PropertyType.CALCULATED_BOOL
        | PropertyType.CALCULATED_STRING;
    calculateScriptId: number;
    needCheck: boolean;
    checkScriptId: number;
}

export interface ICalculatedIntProperty extends ICalculatedProperty {
    type: PropertyType.CALCULATED_INT;
}

export interface ICalculatedFloatProperty extends ICalculatedProperty {
    type: PropertyType.CALCULATED_FLOAT;
    precisionScriptId: number;
}

export interface ICalculatedBoolProperty extends ICalculatedProperty {
    type: PropertyType.CALCULATED_BOOL;
}

export interface ICalculatedStringProperty extends ICalculatedProperty {
    type: PropertyType.CALCULATED_STRING;
}

export interface IImageProperty extends IProperty {
    type: PropertyType.IMAGE;
}

export enum ButtonPropertyPhase {
    ANY,
    IN_CREATION,
    IN_GAME,
}

export interface IButtonProperty extends IProperty {
    type: PropertyType.BUTTON;
    phase: ButtonPropertyPhase;
    textScriptId: number;
    clickScriptId: number;
}

export type Property =
    | IIntProperty
    | IFloatProperty
    | IBoolProperty
    | IStringProperty
    | ISelectionProperty
    | ICalculatedIntProperty
    | ICalculatedFloatProperty
    | ICalculatedBoolProperty
    | ICalculatedStringProperty
    | IImageProperty
    | IButtonProperty;

export class IntProperty implements IIntProperty {
    type: PropertyType.INT = PropertyType.INT;

    constructor(
        public id: number,
        public nameScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class FloatProperty implements IFloatProperty {
    type: PropertyType.FLOAT = PropertyType.FLOAT;

    constructor(
        public id: number,
        public nameScriptId: number,
        public precisionScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class BoolProperty implements IBoolProperty {
    type: PropertyType.BOOL = PropertyType.BOOL;

    constructor(
        public id: number,
        public nameScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class StringProperty implements IStringProperty {
    type: PropertyType.STRING = PropertyType.STRING;

    constructor(
        public id: number,
        public nameScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class SelectionProperty implements ISelectionProperty {
    type: PropertyType.SELECTION = PropertyType.SELECTION;
    constructor(
        public id: number,
        public nameScriptId: number,
        public valueClassScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class CalculatedIntProperty implements ICalculatedIntProperty {
    type: PropertyType.CALCULATED_INT = PropertyType.CALCULATED_INT;

    constructor(
        public id: number,
        public nameScriptId: number,
        public calculateScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class CalculatedFloatProperty implements ICalculatedFloatProperty {
    type: PropertyType.CALCULATED_FLOAT = PropertyType.CALCULATED_FLOAT;

    constructor(
        public id: number,
        public nameScriptId: number,
        public calculateScriptId: number,
        public precisionScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class CalculatedBoolProperty implements ICalculatedBoolProperty {
    type: PropertyType.CALCULATED_BOOL = PropertyType.CALCULATED_BOOL;

    constructor(
        public id: number,
        public nameScriptId: number,
        public calculateScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class CalculatedStringProperty implements ICalculatedStringProperty {
    type: PropertyType.CALCULATED_STRING = PropertyType.CALCULATED_STRING;

    constructor(
        public id: number,
        public nameScriptId: number,
        public calculateScriptId: number,
        public needCheck: boolean,
        public checkScriptId: number
    ) {}
}

export class ImageProperty implements IImageProperty {
    type: PropertyType.IMAGE = PropertyType.IMAGE;
    constructor(public id: number, public nameScriptId: number) {}
}

export class ButtonProperty implements IButtonProperty {
    type: PropertyType.BUTTON = PropertyType.BUTTON;
    constructor(
        public id: number,
        public nameScriptId: number,
        public phase: ButtonPropertyPhase,
        public textScriptId: number,
        public clickScriptId: number
    ) {}
}
