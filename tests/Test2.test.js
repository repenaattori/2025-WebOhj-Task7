const { fireEvent } = require('@testing-library/dom');
const {JSDOM} = require('jsdom');
require('@testing-library/dom')
require('@testing-library/jest-dom');

describe('Test 2', ()=>{
    let dom;
    beforeEach(async ()=>{
        dom = await JSDOM.fromFile('./index.html',{
            resources: 'usable',
            runScripts: 'dangerously'
        });

        await new Promise((resolve) => dom.window.addEventListener('load', resolve));

    })
   
    it('Check removing of list items', ()=>{
    
        let text1 = dom.window.document.getElementById('task');
        let button = dom.window.document.getElementById('add');
        let ul = dom.window.document.getElementById('list');
        let cleanButton = dom.window.document.getElementById('clean');

        fireEvent.change(text1, {target: {value: 'Task1'}} );
        fireEvent.click(button);
        fireEvent.change(text1, {target: {value: 'Task2'}} );
        fireEvent.click(button);
        fireEvent.change(text1, {target: {value: 'Task3'}} );
        fireEvent.click(button);
        fireEvent.change(text1, {target: {value: 'Task4'}} );
        fireEvent.click(button);
        
        let checkboxes = dom.window.document.querySelectorAll('[type="checkbox"]');

        expect(checkboxes.length).toBe(4);

        checkboxes[1].checked = true;
        checkboxes[3].checked = true;

        fireEvent.click(cleanButton);

        expect(ul.children.length).toBe(2);

        expect(ul.textContent).not.toContain('Task2');
        expect(ul.textContent).not.toContain('Task4');
        expect(ul.textContent).toContain('Task1');
        expect(ul.textContent).toContain('Task3');
    
    });
    
})