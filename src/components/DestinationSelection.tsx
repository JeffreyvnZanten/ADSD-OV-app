import React, { useState } from 'react';


function DestinationSelection() {
    const [name, setName] = useState<string>('lorem ipsum');
    return (
        <div>
            <input placeholder={name} />
        </ div>
    );
}

export default DestinationSelection;