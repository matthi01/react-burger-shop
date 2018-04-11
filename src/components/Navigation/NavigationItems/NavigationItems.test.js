import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// connect enzyme
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    // also have access to the beforeEach() and afterEach() function
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />); 
    });

    // each test starts with it() function describing the test then checls with expect()
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    
    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3); 
    });

    it('should render /logout <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});