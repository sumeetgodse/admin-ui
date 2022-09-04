import { useEffect, useState } from "react"

export const RecordRow = ({ item, handleDelete, mainEdit, allSelected, handleChecked }) => {
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState(item.name)
    const [email, setEmail] = useState(item.email)
    const [role, setRole] = useState(item.role)
    const handleEdit = () => {
        setIsEdit(!isEdit)
    }

    const handleEditName = (e) => {
        setName(e.target.value)
    }
    const handleEditEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleEditRole = (e) => {
        setRole(e.target.value)
    }
    useEffect(() => {
        setIsEdit(false)
        setName(item.name)
        setEmail(item.email)
        setRole(item.role)
    }, [item])

    const [style, setStyle] = useState("white")
    const handleClick = () => {
        document.getElementById(item.id + "chk").checked ? setStyle("#cfd8dc") : setStyle("white")
    }
    return (
        <tr
            className="row"
            style={{ backgroundColor: style }}
            key={item.id}
        >
            <td><input
                type="checkbox"
                id={item.id + "chk"}
                checked={allSelected ? true : null}
                onClick={handleClick}
                onChange={() => { handleChecked(item.id, document.getElementById(item.id + "chk").checked) }}
            /></td>
            {!isEdit && <>
                <td>{name}</td>
                <td>{email}</td>
                <td>{role}</td>
            </>}
            {isEdit && <>
                <td><input type="text" value={name} onChange={handleEditName} /></td>
                <td><input type="text" value={email} onChange={handleEditEmail} /></td>
                <td><input type="text" value={role} onChange={handleEditRole} /></td>
            </>}
            <td>
                {!isEdit && <button className="edit-btn" onClick={handleEdit}>Edit</button>}
                {isEdit && <button className="edit-btn" onClick={() => { setIsEdit(false); mainEdit({ ...item, name: name, email: email, role: role }) }}>Save</button>}
                <button
                    className="del-btn"
                    onClick={() => handleDelete(item.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}