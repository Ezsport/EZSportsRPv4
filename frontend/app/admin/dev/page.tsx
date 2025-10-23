"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { AlertTriangle, InfoIcon, CheckCircle2, UserIcon, SettingsIcon, HelpCircleIcon, CalendarIcon, Trash2Icon, EditIcon, MoveVerticalIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

// Sample data for charts and tables
const chartData = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#008d7a', '#00C49F', '#FFBB28', '#FF8042'];

// Generate 50 mock user data rows
const generateMockUsers = () => {
  const roles = ['Admin', 'User', 'Manager', 'Editor', 'Viewer'];
  const departments = ['Sales', 'Marketing', 'Engineering', 'Support', 'Finance', 'HR', 'Product'];
  
  return Array.from({ length: 50 }, (_, index) => ({
    id: `user-${index + 1}`,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: roles[index % roles.length],
    department: departments[index % departments.length],
    avatar: index % 3 === 0 
      ? `https://i.pravatar.cc/150?u=${index}` 
      : null,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
  }));
};

// Form validation schema
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin", "manager"]),
  terms: z.boolean().refine((val) => val, { message: "You must accept terms and conditions" }),
})

export default function Home() {
  // State for interactive components
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [sliderValue, setSliderValue] = useState([50])
  const [switchEnabled, setSwitchEnabled] = useState(false)
  
  // DataTable states
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [users, setUsers] = useState(generateMockUsers())
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [targetIndex, setTargetIndex] = useState<number | null>(null)
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  // Paginated and filtered users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage
    return users.slice(startIndex, startIndex + usersPerPage)
  }, [users, currentPage])

  const totalPages = Math.ceil(users.length / usersPerPage)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      role: "user",
      terms: false,
    },
  })

  // Form submit handler
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    alert(JSON.stringify(values, null, 2))
  }

  // Handle edit action
  const handleEdit = (userId: string) => {
    alert(`Editing user ${userId}`)
  }

  // Handle delete action
  const handleDelete = (userId: string) => {
    // Remove the user from the list
    setUsers(prev => prev.filter(user => user.id !== userId))
    
    // Also remove from selected rows if it was selected
    setSelectedRows(prev => prev.filter(id => id !== userId))
  }

  // Toggle row selection
  const toggleRowSelection = (userId: string) => {
    setSelectedRows(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  // Toggle select all rows
  const toggleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === paginatedUsers.length 
        ? [] 
        : paginatedUsers.map(user => user.id)
    )
  }

  // Drag and drop handlers
  const handleDragStart = (index: number, e: React.DragEvent<HTMLTableCellElement>) => {
    const actualIndex = (currentPage - 1) * usersPerPage + index
    setDraggedIndex(actualIndex)
    e.dataTransfer?.setData('text/plain', actualIndex.toString())
  }

  const handleDragOver = (index: number, e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault()
    const actualIndex = (currentPage - 1) * usersPerPage + index
    setTargetIndex(actualIndex)
  }

  const handleDragLeave = () => {
    setTargetIndex(null)
  }

  const handleDrop = (toIndex: number) => {
    if (draggedIndex === null) return

    const reorderedUsers = [...users]
    const [removed] = reorderedUsers.splice(draggedIndex, 1)
    reorderedUsers.splice(toIndex, 0, removed)
    
    setUsers(reorderedUsers)
    setDraggedIndex(null)
    setTargetIndex(null)
  }

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6">EZSportsRP</h1>
        <p className="text-muted-foreground">Comprehensive UI Component Showcase</p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Buttons */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </CardContent>
        </Card>

        {/* Input */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Input</CardTitle>
            <CardDescription>Text input field</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Enter your name" />
            <Input placeholder="Disabled input" disabled />
          </CardContent>
        </Card>

        {/* Checkbox */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Checkbox</CardTitle>
            <CardDescription>Selection control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label htmlFor="terms" className="text-sm">
                Accept terms and conditions
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Select */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>Dropdown selection</CardDescription>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Switch */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Switch</CardTitle>
            <CardDescription>Toggle control</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Switch 
              id="airplane-mode" 
              checked={switchEnabled}
              onCheckedChange={setSwitchEnabled}
            />
            <label htmlFor="airplane-mode" className="text-sm">
              {switchEnabled ? "Enabled" : "Disabled"}
            </label>
          </CardContent>
        </Card>

        {/* Slider */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Slider</CardTitle>
            <CardDescription>Continuous value selector</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Slider 
              defaultValue={[50]} 
              max={100} 
              step={1} 
              onValueChange={setSliderValue}
            />
            <p className="text-sm text-muted-foreground">
              Current Value: {sliderValue[0]}
            </p>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status and labels</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Informative messages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add components to your app.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
            <Alert variant={null}>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your action was completed.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Tooltip */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Tooltip</CardTitle>
            <CardDescription>Hover information</CardDescription>
          </CardHeader>
          <CardContent className="flex space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Popover */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Popover</CardTitle>
            <CardDescription>Contextual popup</CardDescription>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Popover Title</h4>
                    <p className="text-sm text-muted-foreground">
                      Additional context or actions
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* Dropdown Menu */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Contextual menu</CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircleIcon className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>Expandable sections</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Section 1</AccordionTrigger>
                <AccordionContent>
                  Content for section 1
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Section 2</AccordionTrigger>
                <AccordionContent>
                  Content for section 2
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Form with Advanced Validation */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Advanced Form</CardTitle>
            <CardDescription>Dynamic form with validation</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="user" />
                            </FormControl>
                            <FormLabel className="font-normal">User</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="admin" />
                            </FormControl>
                            <FormLabel className="font-normal">Admin</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          Accept terms and conditions
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
            <CardDescription>Distribution visualization</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Interactive Date Picker */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Date Picker</CardTitle>
            <CardDescription>Select a date</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {date && (
              <p className="text-sm text-muted-foreground">
                Selected Date: {format(date, "PPP")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Avatar */}
        <Card className="border-muted">
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>User profile images with various sizes and shapes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <h4 className="text-sm font-medium">Circular Avatars:</h4>
              <Avatar className="w-6 h-6">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>XS</AvatarFallback>
              </Avatar>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/github.png" alt="@github" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://github.com/microsoft.png" alt="@microsoft" />
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://github.com/google.png" alt="@google" />
                <AvatarFallback>XL</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex items-center space-x-4">
              <h4 className="text-sm font-medium">Square Avatars:</h4>
              <Avatar className="w-8 h-8 rounded-none">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10 rounded-none">
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
              <Avatar className="w-12 h-12 rounded-none">
                <AvatarImage src="https://github.com/github.png" alt="@github" />
                <AvatarFallback>SQ</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex items-center space-x-4">
              <h4 className="text-sm font-medium">Rounded Avatars:</h4>
              <Avatar className="w-8 h-8 rounded-md">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10 rounded-md">
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
              <Avatar className="w-12 h-12 rounded-md">
                <AvatarImage src="https://github.com/github.png" alt="@github" />
                <AvatarFallback>RD</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex items-center space-x-4">
              <h4 className="text-sm font-medium">Fallback Avatars:</h4>
              <Avatar>
                <AvatarFallback>
                  <UserIcon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
              <Avatar className="w-12 h-12 rounded-md">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  JS
                </AvatarFallback>
              </Avatar>
        </div>
          </CardContent>
        </Card>

        {/* Interactive DataTable */}
        <Card className="border-muted lg:col-span-3">
          <CardHeader>
            <CardTitle>Interactive Data Table</CardTitle>
            <CardDescription>User information with selection and reordering</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          paginatedUsers.length > 0 && 
                          paginatedUsers.every(user => selectedRows.includes(user.id))
                        }
                        onCheckedChange={(checked) => {
                          if (checked) {
                            // Select all users on current page
                            setSelectedRows(prev => {
                              const currentPageUserIds = paginatedUsers.map(user => user.id)
                              // Add only users from current page that aren't already selected
                              return Array.from(new Set([...prev, ...currentPageUserIds]))
                            })
                          } else {
                            // Deselect users on current page
                            setSelectedRows(prev => 
                              prev.filter(id => !paginatedUsers.some(user => user.id === id))
                            )
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead className="w-[50px]">
                      <MoveVerticalIcon className="h-4 w-4 text-muted-foreground" />
                    </TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-center">Role</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user, index) => (
                    <TableRow 
                      key={user.id}
                      className={`
                        ${selectedRows.includes(user.id) ? "bg-accent" : ""}
                        ${targetIndex === (currentPage - 1) * usersPerPage + index 
                          ? "border-b border-primary" 
                          : ""
                        }
                      `}
                      onClick={() => toggleRowSelection(user.id)}
                      onDragOver={(e) => handleDragOver(index, e)}
                      onDragLeave={handleDragLeave}
                      onDrop={() => handleDrop((currentPage - 1) * usersPerPage + index)}
                    >
                      <TableCell 
                        onClick={(e) => {
                          // Prevent row selection when directly clicking checkbox
                          e.stopPropagation()
                        }}
                      >
                        <Checkbox
                          checked={selectedRows.includes(user.id)}
                          onCheckedChange={() => toggleRowSelection(user.id)}
                        />
                      </TableCell>
                      <TableCell
                        draggable
                        onDragStart={(e) => handleDragStart(index, e)}
                        className="cursor-move"
                      >
                        <MoveVerticalIcon className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <Avatar>
                          {user.avatar ? (
                            <AvatarImage src={user.avatar} alt={user.name} />
                          ) : (
                            <AvatarFallback>
                              <UserIcon />
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(user.id)
                            }}
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(user.id)
                            }}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 px-2">
              <div className="text-sm text-muted-foreground">
                {selectedRows.length} row(s) selected
            </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    {currentPage > 1 ? (
                      <PaginationLink 
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(prev => Math.max(1, prev - 1))
                        }}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </PaginationLink>
                    ) : (
                      <PaginationLink className="pointer-events-none opacity-50">
                        <ChevronLeftIcon className="h-4 w-4" />
                      </PaginationLink>
                    )}
                  </PaginationItem>
                  {currentPage > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(currentPage - 1)
                        }}
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      {currentPage}
                    </PaginationLink> 
                  </PaginationItem>
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(currentPage + 1)
                        }}
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    {currentPage < totalPages ? (
                      <PaginationLink 
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(prev => Math.min(totalPages, prev + 1))
                        }}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </PaginationLink>
                    ) : (
                      <PaginationLink className="pointer-events-none opacity-50">
                        <ChevronRightIcon className="h-4 w-4" />
                      </PaginationLink>
                    )}
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
    </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
