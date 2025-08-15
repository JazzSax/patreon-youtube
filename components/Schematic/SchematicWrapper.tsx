import { getTemporaryAccessToken } from "@/action/getTemporaryAccessToken";
import SchematicEmbedComponent from "./SchematicEmbedComponent";


async function SchematicWrapper({
    componentId
}: {
    componentId: string;
}) {
   const token = await getTemporaryAccessToken();

   if(!token) {
       throw new Error("Failed to retrieve temporary access token");
    }
   return(
    <SchematicEmbedComponent
    accessToken={token}
    componentId={componentId}   
    />

   
   )
}

export default SchematicWrapper;