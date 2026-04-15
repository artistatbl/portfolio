import { ItemRow } from "@/components/home/row";
import { SectionBlock } from "@/components/home/block";
import type { TimelineItemData } from "@/lib/content";

interface ItemListSectionProps {
  title: string;
  items: TimelineItemData[];
  divider?: boolean;
}

export function ItemListSection({
  title,
  items,
  divider = true,
}: ItemListSectionProps) {
  return (
    <SectionBlock title={title} divider={divider}>
      <ul className="home-list [&>*+*]:border-t">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </SectionBlock>
  );
}
