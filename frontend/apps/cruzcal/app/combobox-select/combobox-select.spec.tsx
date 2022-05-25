import { queryByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ComboboxSelect, { DefaultComboboxSelect, Subject } from './combobox-select';

describe('ComboboxSelect', () => {
  const completeOption = {name: 'hello, world'};
  const partialOption = {name: 'hello'};
  const getDefaultProps = (selected: Subject) => ({
    listName: 'Example',
    options: [{name: 'hello, world'}, {name: 'hello, planet'}],
    disabled: false,
    selected,
    setSelected: (sel: Subject) => {}
  });

  it('should render successfully', async () => {
    const { baseElement } = render(<DefaultComboboxSelect />);
    expect(baseElement).toBeTruthy();

    await screen.findByRole('combobox', {name: /combobox-input-default/i});
    await screen.findByRole('button', {name: /combobox-dropdown-default/i});
  });
  it('Null selection', async () => {
    const props = getDefaultProps(null);
    render(<ComboboxSelect {...props} />);

    const input = await screen.findByRole('combobox', {name: /combobox-input-example/i});

    expect(input).toHaveDisplayValue(`Select ${props.listName}...`);
  });
  it('Example selection', async () => {
    const props = getDefaultProps(completeOption);
    render(<ComboboxSelect {...props} />);

    const input = await screen.findByRole('combobox', {name: /combobox-input-example/i});

    expect(input).toHaveDisplayValue(props.selected.name);
  });
  it('Type in full selection input', async () => {
    const user = userEvent.setup();

    const props = getDefaultProps(null);
    props.setSelected = (sel) => props.selected = sel;
    const newSelection = completeOption;

    render(<ComboboxSelect {...props} />);

    const input = await screen.findByRole('combobox', {name: /combobox-input-example/i});

    // Clear input and enter new selection text
    await user.clear(input);
    await user.type(input, newSelection.name);

    // Should have only on choice for option
    const option = await screen.findByRole('option', {name: /combobox-option-example/i});

    await user.click(option);

    // Selected option should be set after selecting from dropdown
    expect(props.selected).toStrictEqual(newSelection);
  });
  it('Select from dropdown options', async () => {
    const user = userEvent.setup();

    const props = getDefaultProps(null);
    props.setSelected = (sel) => props.selected = sel;
    const newSelection = completeOption;

    render(<ComboboxSelect {...props} />);

    const input = await screen.findByRole('combobox', {name: /combobox-input-example/i});

    // Clear input and enter new selection text
    await user.clear(input);
    await user.type(input, partialOption.name);

    // Find option matching name of new selection
    const options = await screen.findAllByRole('option', {name: /combobox-option-example/i});
    for (const option of options) {
      const foundOption = queryByText(option, newSelection.name);
      if (foundOption) {
        await user.click(option);
        break;
      }
    }
    // Selected option should be set after selecting from dropdown
    expect(props.selected).toStrictEqual(newSelection);
  });
});