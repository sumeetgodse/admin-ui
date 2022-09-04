import { RecordRow } from "./RecordRow"
import "./Records.css"

export const RecordsPerPage = (props) => {
    const { records, allSelected, handleDelete, mainEdit, handleChecked } = props

    return (
        <>
            {
                records.map((item) => {
                    return (
                        <RecordRow
                            key={item.id}
                            item={item}
                            handleDelete={handleDelete}
                            mainEdit={mainEdit}
                            allSelected={allSelected}
                            handleChecked={handleChecked}
                        />
                    )
                })
            }
        </>
    )
}