import { render, screen } from '@testing-library/react';

import CSFilters, { TermFilter } from './CSFilters';

import {exampleSelection} from '../../mocks/data';
import { defaultCourseSelection } from 'apps/cruzcal/atoms/course-selector';

describe('CSFilters', () => {
  it('default course selection', async () => {
    let selection = defaultCourseSelection;
    render(<CSFilters courseSelection={selection} setCourseSelection={()=>{}}/>);

    await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    await screen.findByRole('combobox', {name: /combobox-input-course/i});
  });
  it('example course selection', async () => {
    const selection = exampleSelection;
    render(<CSFilters courseSelection={selection} setCourseSelection={() => {}}/>);

    const subjectInput = await screen.findByRole('combobox', {name: /combobox-input-subject/i});
    const courseInput = await screen.findByRole('combobox', {name: /combobox-input-course/i});

    const subjectMatcher = new RegExp(exampleSelection.subject.name);
    const courseMatcher = new RegExp(exampleSelection.course.name);

    expect(subjectInput).toHaveDisplayValue(subjectMatcher);
    expect(courseInput).toHaveDisplayValue(courseMatcher);
  });
});

describe('TermFilters', () => {
  it('Default term filter', async () => {
    let selection = defaultCourseSelection;
    render(<TermFilter selected={selection.term} setSelected={()=>{}}/>);

    await screen.findByRole('combobox', {name: /combobox-input-term/i});
    await screen.findByRole('button', {name: /combobox-dropdown-term/i});
  })
  it('Example term filter', async () => {
    const selection = exampleSelection.term;

    render(<TermFilter selected={selection} setSelected={()=>{}}/>);

    const termInput = await screen.findByRole('combobox', {name: /combobox-input-term/i});

    const termMatcher = new RegExp(exampleSelection.term.name);
    expect(termInput).toHaveDisplayValue(termMatcher);
  })
})


