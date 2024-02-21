import ClinicContainer from "../containers/ClinicContainer"
import ClinicContextProvider from "../contexts/ClinicContext"

export default function ClinicPage() {
    return (
        <ClinicContextProvider>
            <ClinicContainer />
        </ClinicContextProvider>
    )
}