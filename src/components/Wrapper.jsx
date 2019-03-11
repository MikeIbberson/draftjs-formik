import styled from 'styled-components';

export default styled.div`
    border: 2px solid #DDD;
    border-radius: 5px;
    box-sizing: border-box;
    position: relative;
    max-width: 100%;

    [contenteditable] {  
        box-sizing: border-box;
        min-height: 250px;
        padding: 1rem; 
    }
`;