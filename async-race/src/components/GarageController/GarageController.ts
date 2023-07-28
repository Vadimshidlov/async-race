import {ColorPicker} from '../create-input/ColorPicker';
import {createButtonElement} from '../create-input/createButtonElement';
import {CreateInputElement} from '../create-input/CreateInputElement';
import createElement from '../element/createElement';

export type CreateCarValuesType = {
    textValue: string;
    colorValue: string;
};

export interface IGarageController {
    getControllerHtml: () => HTMLElement
    disableUpdateInput: () => void
    enableUpdateInput: () => void
    disableCreateInput: () => void
    enableCreateInput: () => void
    disableRaceStartButton: () => void
    enableRaceStartButton: () => void
    getCreateCarValues: () => CreateCarValuesType
    getUpdateCarValues: () => CreateCarValuesType
    getCreateButton: () => HTMLButtonElement
    getRaceStartButton: () => HTMLButtonElement
    getRaceResetButton: () => HTMLButtonElement
    getUpdateCarButton: () => HTMLButtonElement
    getGenerateCarButton: () => HTMLButtonElement
    setCreateInputFailedState: () => void
    setUpdateInputFailedState: () => void
    clearCreateInputValues: () => void
    clearUpdateInputValues: () => void
    disableControllerButtons: () => void
    enableControllerButtons: () => void
    setUpdateInputValue: (valueName: string, valueColor: string) => void
    setUpdateSelectCarId: (id: number) => void
    getUpdateSelectCarId: () => number
    setUpdateSelectCarName: (name: string) => void
}

export class GarageController implements IGarageController {
    private createInput: CreateInputElement = new CreateInputElement();

    private readonly createInputElement: HTMLInputElement;

    private readonly updateInput: CreateInputElement = new CreateInputElement();

    private readonly updateInputElement: HTMLInputElement;

    private readonly createButtonElement: HTMLButtonElement = createButtonElement(
        'Create',
    );

    private readonly updateButtonElement: HTMLButtonElement = createButtonElement(
        'Update',
    );

    private raceStartButtonElement: HTMLButtonElement = createButtonElement('Race');

    private raceResetButtonElement: HTMLButtonElement = createButtonElement('Reset');

    private generateCarButtonElement: HTMLButtonElement = createButtonElement('New Cars');

    private createColorPicker: ColorPicker = new ColorPicker();

    private readonly createColorPickerElement: HTMLInputElement;

    private updateColorPicker: ColorPicker = new ColorPicker();

    private readonly updateColorPickerElement: HTMLElement;

    private updateSelectCarId: number | null = null;

    private updateSelectCarName: string | null = null;

    private readonly MISSED_CAR_ID_MESSAGE: string = 'Update car Id is not defined';

    constructor() {
        this.createInputElement = this.createInput.getElement();
        this.updateInputElement = this.updateInput.getElement();
        this.createColorPickerElement = this.createColorPicker.getElement();
        this.updateColorPickerElement = this.updateColorPicker.getElement();
        this.disableUpdateInput();
    }

    public getControllerHtml(): HTMLElement {
        const controllerSection = createElement({
            tag: 'section',
            classNames: ['controller'],
            text: '',
        });

        const createBlock = createElement({
            tag: 'div',
            classNames: ['controller__block', 'block-create'],
            text: '',
        });
        createBlock.append(
            this.createInputElement,
            this.createColorPickerElement,
            this.createButtonElement,
        );

        const updateBlock = createElement({
            tag: 'div',
            classNames: ['controller__block', 'block-update'],
            text: '',
        });
        this.updateButtonElement.disabled = true;
        this.updateInputElement.disabled = true;

        updateBlock.append(
            this.updateInputElement,
            this.updateColorPickerElement,
            this.updateButtonElement,
        );

        const raceBlock = createElement({
            tag: 'div',
            classNames: ['controller__block', 'block-race'],
            text: '',
        });

        this.raceResetButtonElement.disabled = true;

        raceBlock.append(
            this.raceStartButtonElement,
            this.raceResetButtonElement,
            this.generateCarButtonElement,
        );

        controllerSection.append(createBlock, updateBlock, raceBlock);

        return controllerSection;
    }

    public disableUpdateInput(): void {
        this.updateInputElement.disabled = true;
    }

    public enableUpdateInput(): void {
        this.updateInputElement.disabled = false;
        this.updateInputElement.focus();
    }

    public disableCreateInput(): void {
        this.createInputElement.disabled = true;
    }

    public enableCreateInput(): void {
        this.createInputElement.disabled = false;
    }

    public disableRaceStartButton(): void {
        this.raceStartButtonElement.disabled = true;
    }

    public enableRaceStartButton(): void {
        this.raceStartButtonElement.disabled = false;
    }

    public getCreateCarValues(): CreateCarValuesType {
        const textValue = this.createInput.getInputValue();
        const colorValue = this.createColorPicker.getInputValue();

        return {
            textValue,
            colorValue,
        };
    }

    public getUpdateCarValues(): CreateCarValuesType {
        const textValue = this.updateInput.getInputValue();
        const colorValue = this.updateColorPicker.getInputValue();

        return {
            textValue,
            colorValue,
        };
    }

    public getCreateButton(): HTMLButtonElement {
        return this.createButtonElement;
    }

    public getRaceStartButton(): HTMLButtonElement {
        return this.raceStartButtonElement;
    }

    public getRaceResetButton(): HTMLButtonElement {
        return this.raceResetButtonElement;
    }

    public getUpdateCarButton(): HTMLButtonElement {
        return this.updateButtonElement;
    }

    public getGenerateCarButton(): HTMLButtonElement {
        return this.generateCarButtonElement;
    }

    public setCreateInputFailedState(): void {
        this.createInput.setFailedState();
    }

    public setUpdateInputFailedState(): void {
        this.updateInput.setFailedState();
    }

    public clearCreateInputValues(): void {
        this.createColorPicker.clearInputValue();
        this.createInput.clearInputValue();
    }

    public clearUpdateInputValues(): void {
        this.updateColorPicker.clearInputValue();
        this.updateInput.clearInputValue();
    }

    public disableControllerButtons(): void {
        this.raceStartButtonElement.disabled = true;
        this.raceResetButtonElement.disabled = true;
        this.generateCarButtonElement.disabled = true;
        this.createButtonElement.disabled = true;
    }

    public enableControllerButtons(): void {
        this.raceStartButtonElement.disabled = false;
        this.generateCarButtonElement.disabled = false;
        this.createButtonElement.disabled = false;
        this.updateButtonElement.disabled = true;
    }

    public setUpdateInputValue(valueName: string, valueColor: string): void {
        this.updateInput.setInputValue(valueName);
        this.updateColorPicker.setColorPickerValue(valueColor);
    }

    public setUpdateSelectCarId(id: number): void {
        this.updateSelectCarId = id;
    }

    public getUpdateSelectCarId(): number {
        if (!this.updateSelectCarId) {
            throw new Error(this.MISSED_CAR_ID_MESSAGE);
        }

        return this.updateSelectCarId;
    }

    public setUpdateSelectCarName(name: string): void {
        this.updateSelectCarName = name;
    }
}
