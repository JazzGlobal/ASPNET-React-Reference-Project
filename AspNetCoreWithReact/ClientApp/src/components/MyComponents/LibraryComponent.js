import React, { useState } from 'react';
import axios from 'axios';

const LibraryComponent = (props) => {

    /* List Libraries */
    const [librariesList, setLibrariesList] = useState(
        [
            { id: 1, name: 'Library 1', address: 'Address 1', telephone: 123456789 },
            { id: 2, name: 'Library 2', address: 'Address 2', telephone: 123456789 }
        ]
        );

    /* Search */
    const [searchParameterName, setSearchParameterName] = useState('');
    const handleInputChange = (event) => {
        setSearchParameterName(event.target.value)
    }

    const searchItems = () => {
        let URL = searchParameterName != "" ? ("https://localhost:7225/api/library/Search?prName=" + searchParameterName) : "https://localhost:7225/api/library/GetAll";
        axios.get(URL).then(response => {
            response.data.map(item => { item.isEditing = false; })
            setLibrariesList(response.data)
        })
    }
    // UPDATING LIBRARIES 
    const handleLibraryInputChange = (prLibrary, prInput) => {
        let librariesNewReference = [...librariesList] // Create copy of the object with new reference
        const index = librariesNewReference.findIndex((item) => item.name == prLibrary.name);
        const { name, value } = prInput.target; // Get the NAME and VALUE of the property changed.
        librariesNewReference[index] = { ...prLibrary, [name]: value }; // Update just the specific property ... keeping the others.
        setLibrariesList(librariesNewReference)
    }
    const updateEditingStatus = (prLibrary, prFlag) => {
        let librariesNewReference = [...librariesList]; // Create copy of the object with new reference
        const index = librariesNewReference.findIndex((item) => item.name == prLibrary.name);
        librariesNewReference[index].isEditing = prFlag
        setLibrariesList(librariesNewReference)
    }

    const confirmUpdate = (prLibrary) => {
        axios.put("https://localhost:7225/api/library/Update", prLibrary).then(response => {
            let librariesNewReference = [...librariesList]; // Create copy of the object with new reference
            const index = librariesNewReference.findIndex((item) => item.name == prLibrary.name);
            librariesNewReference[index] = prLibrary
            librariesNewReference[index].isEditing = false
            setLibrariesList(librariesNewReference)
        })
    }

    // ADDING LIBRARIES
    const [libraryToAdd, setLibraryToAdd] = useState({name: '', address: '', telephone: ''});

    const handleLibraryToAddInputChange = (prInput) => {
        const { name, value } = prInput.target;
        let libraryToAddNewReference = { ...libraryToAdd, [name]: value };
        setLibraryToAdd(libraryToAddNewReference);
    }
 
    const confirmNewLibrary = () => {
        axios.post("https://localhost:7225/api/library/Save", libraryToAdd).then(response => {
            let librariesNewReference = [...librariesList];
            librariesNewReference.push(response.data);
            setLibrariesList(librariesNewReference);
            setLibraryToAdd({name: '', address: '', telephone: ''}) // Clear the state
        })
    }

    return (
        <div>
            <hr/>
            <h2>Library</h2>
            <br />
            <div className="row">
                { /* Search Library */}
                <div className="col-md-4">
                    <div className="Card border border-secondary shadow-0"  >
                        <div className="card-header bg-secondary text-white">
                            <b>Search</b> Library
                            <span className="glyphicon glyphicon-search"></span>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-7">
                                    <label className="form-label">Name</label>
                                    <input className="form-control" placeholder="Enter Name" name="name" value={searchParameterName} onChange={handleInputChange} type="text" />
                                </div>
                                <div className="col-md-5">
                                    <label className="form-label">&nbsp;</label>
                                    <div className="btn-toolbar">
                                        <button type="button" className="btn btn-primary form-control" onClick={searchItems.bind(this)}> Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* New Library */}
                <div className="col-md-8">
                <div className="Card border border-secondary shadow-0"  >
                    <div className="card-header bg-secondary text-white"><b>New</b> Library</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3">
                                <label className="form-label">Name</label>
                                    <input className="form-control" placeholder="Enter Name" onChange={handleLibraryToAddInputChange.bind(this)} value={libraryToAdd.name}name="name" type="text"/>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Address</label>
                                    <input className="form-control" placeholder="Enter Address" onChange={ handleLibraryToAddInputChange.bind(this) }value={libraryToAdd.address} name="address" type="text" />
                            </div>
                            <div className="col-md-3">
                                    <label className="form-label">Telephone</label>
                                    <input className="form-control" placeholder="Enter Telephone" onChange={handleLibraryToAddInputChange.bind(this)} value={libraryToAdd.telephone} name="telephone" type="text" />
                            </div>
                            <div className="col-md-2">
                                    <label className="form-label">&nbsp;</label>
                                    <button type="button" className="btn btn-success form-control" onClick={confirmNewLibrary.bind(this)}>Save</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <br />
            </div>
            <br/>
            <div className="row">
                { /* DISPLAY LIBRARIES */}
                <div className="col-md-12">
                <div className="card border border-secondary shadow-0">
                    <div className="card-header bg-secondary text-white"><b>Display</b> Libraries</div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Telephone</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {librariesList.map(item =>
                                        <tr key={item.name}>
                                            <td><input className="form-control" value={item.name} onChange={handleLibraryInputChange.bind(this,item)} name="name" disabled={!item.isEditing} /></td>
                                            <td><input className="form-control" value={item.address} onChange={handleLibraryInputChange.bind(this, item)} name="address" disabled={!item.isEditing} /></td>
                                            <td><input className="form-control" value={item.telephone} onChange={handleLibraryInputChange.bind(this, item)} name="telephone" disabled={!item.isEditing} /></td>
                                            <td>
                                                <div className="btn-toolbar">
                                                    <button type="button" className="btn btn-info mr-2" onClick={updateEditingStatus.bind(this, item, true)} style={{ display: item.isEditing ? 'none' : 'block' }}>Edit</button>
                                                    <button type="button" className="btn btn-warning mr-2" onClick={updateEditingStatus.bind(this, item, false)} style={{ display: item.isEditing ? 'block' : 'none' }}>Cancel</button>
                                                    <button type="button" className="btn btn-success mr-2" onClick={confirmUpdate.bind(this, item)} style={{ display: item.isEditing ? 'block' : 'none' }}>Save</button>
                                                </div>

                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                        </table>
                    </div>
                    </div>
                    </div>
            </div>
        </div>
       
         )
}

export default LibraryComponent