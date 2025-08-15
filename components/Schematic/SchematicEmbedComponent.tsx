'use client'

import { EmbedProvider, SchematicEmbed } from '@schematichq/schematic-components';

function SchematicEmbedComponent({
    accessToken,
    componentId,
}: {
    accessToken: string;
    componentId: string;
}) {
    return (
    <EmbedProvider>
         <SchematicEmbed
        accessToken={accessToken}
        id={componentId}/>
    </EmbedProvider>
        
        
    );
}

export default  SchematicEmbedComponent;