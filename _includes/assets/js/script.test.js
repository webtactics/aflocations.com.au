// Import the function to be tested
const { appearOnScroll } = require('./script');

// Mock the IntersectionObserver class
class IntersectionObserverMock {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
  }

  observe(target) {
    const entry = {
      target,
      isIntersecting: true
    };
    this.callback([entry], this);
  }

  unobserve(target) {
    // Mock unobserve behavior
  }
}

// Mock the appearOptions object
const appearOptions = {};

// Test the appearOnScroll function
describe('appearOnScroll', () => {
  let observer;

  beforeEach(() => {
    // Create a new instance of the IntersectionObserverMock before each test
    observer = new IntersectionObserverMock(appearOnScroll, appearOptions);
  });

  test('should add "appear" class to target element when it is intersecting', () => {
    // Create a mock target element
    const target = document.createElement('div');

    // Call the observe method to trigger the callback
    observer.observe(target);

    // Check if the "appear" class is added to the target element
    expect(target.classList.contains('appear')).toBe(true);
  });

  test('should not add "appear" class to target element when it is not intersecting', () => {
    // Create a mock target element
    const target = document.createElement('div');

    // Set isIntersecting to false
    const entry = {
      target,
      isIntersecting: false
    };

    // Call the callback directly with the mock entry
    observer.callback([entry], observer);

    // Check if the "appear" class is not added to the target element
    expect(target.classList.contains('appear')).toBe(false);
  });

  test('should call unobserve method when target element is intersecting', () => {
    // Create a mock target element
    const target = document.createElement('div');

    // Spy on the unobserve method
    const unobserveSpy = jest.spyOn(observer, 'unobserve');

    // Call the observe method to trigger the callback
    observer.observe(target);

    // Check if the unobserve method is called with the target element
    expect(unobserveSpy).toHaveBeenCalledWith(target);
  });
});