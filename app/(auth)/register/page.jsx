
import RegisterComponent from "./registerComponent"
export default function Page() {
    return(
        <div className="flex h-screen items-center justify-center  p-2">
                    <div className="card border lg:w-1/4 md:w-1/3 w-full border-primary">
                        <div className="card-body">
                            < RegisterComponent />
                        </div>
        
                    </div>
        
                </div>
    )
}
