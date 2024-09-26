import React, { useState } from 'react';


function LocatieVan() {
    const [name, setName] = useState<string>('lorem ipsum');
    return (
        <div>
            <input placeholder={name} />
        </ div>
    );
}

export default LocatieVan;