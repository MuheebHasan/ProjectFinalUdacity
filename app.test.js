import { performAction } from '../src/client/js/app';

test('performAction should alert when city input is empty', () => {
  document.body.innerHTML = `<input id="city" value="">`;
  window.alert = jest.fn();

  performAction();
  expect(window.alert).toHaveBeenCalledWith('Please enter a city name!');
});
