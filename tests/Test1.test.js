const { fireEvent } = require('@testing-library/dom');
const {JSDOM} = require('jsdom');
require('@testing-library/dom')
require('@testing-library/jest-dom');

describe('Test 1', ()=>{
    let dom;
    beforeEach(async ()=>{
        dom = await JSDOM.fromFile('./index.html',{
            resources: 'usable',
            runScripts: 'dangerously'
        });

        await new Promise((resolve) => dom.window.addEventListener('load', resolve));

    })
   
    it('Check number of list items and their content', ()=>{
    
        let text1 = dom.window.document.getElementById('task');
        let button = dom.window.document.getElementById('add');
        let ul = dom.window.document.getElementById('list');

        fireEvent.change(text1, {target: {value: 'Task1'}} );
        fireEvent.click(button);
        fireEvent.change(text1, {target: {value: 'Task2'}} );
        fireEvent.click(button);
        

        expect(ul.children.length).toBe(2);
        expect(ul.innerHTML).toContain('Task1');
        expect(ul.innerHTML).toContain('Task2');
    
    });
    
})