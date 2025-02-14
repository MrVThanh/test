import Image from "next/image"
import { Link } from "@/i18n/routing"
import searchBooksAdvance from "@/queries/books/search-books-advance"
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  EllipsisVertical,
  Headphones,
  ScrollText,
} from "lucide-react"

import { getTranslations } from "@/lib/get-translations"
import { type LibraryItem } from "@/lib/types/models"
import { searchBooksAdvanceSchema } from "@/lib/validations/books/search-books-advance"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import SheetSearchBook from "../_components/sheet-search-book"

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const SearchResult = async ({ searchParams }: Props) => {
  const { sort, ...rest } = searchBooksAdvanceSchema.parse({
    ...searchParams,
    searchWithKeyword: searchParams.searchWithKeyword
      ? +searchParams.searchWithKeyword
      : undefined,
  })
  const t = await getTranslations("BookPage")
  const data = await searchBooksAdvance({ sort, ...rest })

  return (
    <div className="container flex size-full flex-col gap-4 overflow-y-auto">
      <div className="w-full space-y-2 px-12">
        <SheetSearchBook />
      </div>

      <section className="flex items-center justify-between px-12">
        <div className="flex">
          <p className="font-semibold">Kết quả: {data?.totalActualResponse}</p>
        </div>
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Hiển thị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Hiển thị: 10</SelectItem>
              <SelectItem value="20">Hiển thị: 20</SelectItem>
              <SelectItem value="50">Hiển thị: 50</SelectItem>
              <SelectItem value="100">Hiển thị: 100</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mức độ liên quan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">Hiển thị: 10</SelectItem>
              <SelectItem value="20">Hiển thị: 20</SelectItem>
              <SelectItem value="50">Hiển thị: 50</SelectItem>
              <SelectItem value="100">Hiển thị: 100</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"}>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ScrollText /> Lịch sử tìm kiếm
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>

      {data.libraryItems.length > 0 ? (
        <section className="space-y-4 px-12">
          {data.libraryItems.map((item: LibraryItem, i) => (
            <div key={i} className="rounded-lg border-2 p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Sách</p>
                <Button asChild variant={"link"}>
                  <Link
                    href={`/books/${item.libraryItemId}`}
                    className="flex items-center gap-2"
                  >
                    View Detail
                  </Link>
                </Button>
              </div>
              <Separator className="my-2" />

              <div className="flex gap-4">
                <div className="flex w-1/8 justify-center">
                  <Image
                    src={item.coverImage || ""}
                    width={100}
                    height={100}
                    alt="book"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-thin italic">
                    {t("an edition of")} &nbsp;
                    <span className="font-semibold">{item.title}</span>
                  </p>
                  <h1 className="text-xl font-semibold text-primary">
                    {item.title}: Tài liệu giảng dạy /
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Tác giả</span>
                    {item.authors.length > 0 && item.authors[0].fullName}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Chủ đề </span>{" "}
                    {item.topicalTerms}
                  </div>
                  <div className="flex gap-2">
                    <div className="w-fit font-semibold">Summary</div>
                    <span className="line-clamp-1">{item.summary}</span>
                  </div>
                </div>
              </div>

              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Số kệ</TableHead>
                    <TableHead>Kí hiệu xếp giá</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="flex items-center gap-2 font-medium">
                      <CheckCircle2 size={16} color="white" fill="#42bb4e" />
                      Available
                    </TableCell>
                    <TableCell>AGU-Institutional Resources - F3</TableCell>
                    <TableCell>909 G106 2024</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mt-4 flex items-center gap-2">
                    Resources <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Headphones /> Audio
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookOpen />
                    Ebook
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </section>
      ) : (
        <section className="space-y-4 px-12">
          <Card className="mt-4 w-full rounded-lg py-8 text-center text-2xl font-semibold text-danger shadow-lg">
            No data
          </Card>
        </section>
      )}

      <Separator />
      <div className="flex h-5 items-center justify-center space-x-4 text-sm">
        <div>Chính sách riêng tư</div>
        <Separator orientation="vertical" />
        <div>Điều khoản sử dụng</div>
        <Separator orientation="vertical" />
        <div>Đăng xuất theo tổ chức</div>
        <Separator orientation="vertical" />
        <div>Quản lí cookies của bạn</div>
      </div>
    </div>
  )
}

export default SearchResult
