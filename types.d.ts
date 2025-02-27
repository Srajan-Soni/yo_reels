import { Connection } from "mongoose"

declare global {
    var mongoose : {
        conn: Connection | "",
        promise: Promise | null
    }
}
export {}