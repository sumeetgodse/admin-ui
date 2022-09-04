import { useEffect, useState } from "react"
import "./Records.css"
import { RecordsPerPage } from "./RecordsPerPage"

export const Records = () => {
    const [records, setRecords] = useState([])
    const [filteredRecords, setFilteredRecords] = useState([])
    const [noOfPages, setNoOfPages] = useState(0)
    const [currPage, setCurrPage] = useState(1)
    const [search, setSearch] = useState("")
    const [allSelected, setAllSelected] = useState(false)

    useEffect(() => {
        const fetchRecords = async () => {
            const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            const result = await response.json()
            setRecords(result)
            setFilteredRecords(result)
        }
        fetchRecords()
    }, [])
    useEffect(() => {
        setNoOfPages(Math.ceil(filteredRecords.length / 10))
        setFilteredRecords(records.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.role.toLowerCase().includes(search.toLowerCase())
        }))
        setAllSelected(false)
    }, [records, filteredRecords.length, search])

    const mainEdit = (item) => {
        setRecords(records.map((record) => {
            if (record.id === item.id) {
                return { ...record, name: item.name, email: item.email, role: item.role }
            }
            return record
        }))
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    const handleAllSelect = () => {
        setAllSelected(!allSelected)
    }
    const handleDelete = (id) => {
        setRecords(records.filter(item => item.id !== id));
    }
    const handleDeleteChecked = () => {
        setRecords(records.filter((record) => {
            return !checkedIds.includes(record.id)
        }))
    }
    const [checkedIds, setCheckedIds] = useState([])
    const handleChecked = (id, checked) => {
        checked ? setCheckedIds([...checkedIds, id])
            : setCheckedIds(checkedIds.filter((Iid) => {
                return Iid !== id
            }))
    }
    return (
        <>
            <input
                onChange={(e) => { handleChange(e) }}
                value={search} className="search-input"
                type="text"
                placeholder="Search by name, email or role..."
            />
            <table>
                <tbody>
                    <tr>
                        <th><input type="checkbox" onClick={handleAllSelect} /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    <RecordsPerPage
                        allSelected={allSelected}
                        records={filteredRecords.slice((currPage - 1) * 10, currPage * 10)}
                        handleDelete={handleDelete}
                        mainEdit={mainEdit}
                        handleChecked={handleChecked}
                    />
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td className="del-sel" onClick={handleDeleteChecked}>Delete Selected</td>
                        <td className="pagination-items" onClick={() => setCurrPage(1)}>First</td>
                        <td className="pagination-items" onClick={() => setCurrPage(currPage - 1)}>Prev</td>
                        {
                            Array.from(Array(noOfPages), (e, i) => {
                                return <td
                                    className="pagination-numbers"
                                    onClick={() => setCurrPage(i + 1)}
                                    key={i}>{i + 1}
                                </td>
                            })
                        }
                        <td className="pagination-items" onClick={() => setCurrPage(currPage + 1)}>Next</td>
                        <td className="pagination-items" onClick={() => setCurrPage(noOfPages)}>Last</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}