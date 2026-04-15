import { ItemRow } from "@/components/home/row";
import { SectionBlock } from "@/components/home/block";
import type { TimelineItemData } from "@/lib/content";

interface ItemListSectionProps {
  title: string;
  items: TimelineItemData[];
}

export function ItemListSection({
  title,
  items,
}: ItemListSectionProps) {
  return (
    <SectionBlock title={title} divider>
      <ul className="home-list divide-y border-y">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </SectionBlock>
  );
}
