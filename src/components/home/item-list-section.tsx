import { ItemRow } from "@/components/home/item-row";
import { SectionBlock } from "@/components/home/section-block";
import type { TimelineItemData } from "@/lib/homepage-content";

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
      <ul className="divide-y divide-[#ece5dc] border-y border-[#ece5dc]">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </SectionBlock>
  );
}
