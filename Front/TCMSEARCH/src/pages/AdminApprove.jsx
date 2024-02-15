export default function AdminApprove() {
    return (
        <div>
            <div className="overflow-x-auto mt-4">
                <div>
                    <h1 className="text-2xl font-bold text-center">Status</h1>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>ชื่อคลินิก</th>
                            <th>status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Approved</td>

                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Pending</td>

                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Pending</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}