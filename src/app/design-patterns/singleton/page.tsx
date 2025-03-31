import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OLD_CODE = `class Logger:
  def __init__(self):
    self.file = open("app.log", "a")
    
  def log(self, message: str):
    self.file.write(f"{message}\\n")
        
# In different parts of your application
logger1 = Logger()
logger2 = Logger()
logger3 = Logger()

# Each logger opens its own file handle
logger1.log("User logged in")
logger2.log("Database connection failed")
logger3.log("Cache miss")`;

const NEW_CODE = `class Logger:
  _instance = None

  def __new__(cls):
    if cls._instance is None:
      cls._instance = super(Logger, cls).__new__(cls)
      cls._instance.file = open("app.log", "a")
      return cls._instance
    
  def log(self, message: str):
    self.file.write(f"{message}\\n")
        
# In different parts of your application
logger1 = Logger()
logger2 = Logger()
logger3 = Logger()

# All loggers share the same instance and file handle
logger1.log("User logged in")
logger2.log("Database connection failed")
logger3.log("Cache miss")`;

export default function Home() {
  return (
    <PageContainer>
      <H1 title="Singleton" subtitle="Singleton design pattern" />

      <p>
        The Singleton pattern ensures that a class has only one instance and
        provides a global point of access to it. This pattern is particularly
        useful when exactly one object is needed to coordinate actions across
        the system, such as managing a shared resource or maintaining a single
        point of control.
      </p>

      <p>Common use cases for the Singleton pattern include:</p>
      <ul className="mb-4 list-disc pl-4">
        <li>Logging systems that write to a single file</li>
        <li>Database connection managers</li>
        <li>Configuration managers</li>
        <li>Cache managers</li>
        <li>Thread pools</li>
      </ul>

      <p>
        For example, in a logging system, you want to ensure that all parts of
        your application write to the same log file. Without the Singleton
        pattern, you might end up with multiple logger instances, each opening
        its own file handle, which could lead to resource waste and potential
        file corruption.
      </p>

      <H2 title="Implementation example" />

      <Tabs defaultValue="old" className="w-full">
        <TabsList>
          <TabsTrigger value="old">Without Singleton</TabsTrigger>
          <TabsTrigger value="new">With Singleton</TabsTrigger>
        </TabsList>
        <TabsContent value="old">
          <CodeBlock code={OLD_CODE}>
            <HighlightedCode code={OLD_CODE} lang="python" />
          </CodeBlock>
          <p>
            In this implementation, each time we create a new Logger instance,
            it opens a new file handle. This is inefficient and could lead to
            resource exhaustion if many loggers are created. It also makes it
            harder to manage the log file since multiple handles are writing to
            it.
          </p>
        </TabsContent>
        <TabsContent value="new">
          <CodeBlock code={NEW_CODE}>
            <HighlightedCode code={NEW_CODE} lang="python" />
          </CodeBlock>
          <p>
            Using the Singleton pattern, we ensure that only one Logger instance
            exists throughout the application. The `__new__` method checks if an
            instance already exists and returns it if it does. This way, all
            parts of the application share the same logger instance and file
            handle, making the logging system more efficient and easier to
            manage.
          </p>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
