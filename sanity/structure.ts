import type { StructureResolver } from "sanity/structure";
import { MailPlus, MailCheck, MailOpen } from "lucide-react";
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== "message"
      ),

      S.listItem()
        .title("VIP Messages")
        .icon(MailPlus)
        .child(
          S.list()
            .title("VIP Messages")
            .items([
              S.listItem()
                .title("New Messages")
                .icon(MailCheck)
                .child(
                  S.documentList()
                    .title("New Messages")
                    .filter('_type == "message" && isRead != true')
                    .defaultOrdering([
                      { field: "_createdAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Read Messages")
                .icon(MailOpen)
                .child(
                  S.documentList()
                    .title("Read Messages")
                    .filter('_type == "message" && isRead == true')
                    .defaultOrdering([
                      { field: "_createdAt", direction: "desc" },
                    ])
                ),
            ])
        ),
    ]);
