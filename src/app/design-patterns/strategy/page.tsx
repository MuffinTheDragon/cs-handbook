import { CodeBlock } from "@/components/code-block";
import { HighlightedCode } from "@/components/highlight-code";
import { PageContainer } from "@/components/page/page-container";
import { H1 } from "@/components/typography/h1";
import { H2 } from "@/components/typography/h2";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <PageContainer>
      <H1 title="Strategy" subtitle="Strategy design pattern" />

      <p>
        Strategy is a design pattern in object-oriented programming that aims to
        encapsulate a common behavior that can be used in a variety of different
        situations. It promotes code reusability and flexibility, making it
        easier to modify or extend the behavior of a class without affecting
        other parts of the codebase.
      </p>

      <p>
        The Strategy pattern involves defining a family of algorithms,
        encapsulating each one, and making them interchangeable. By using the
        Strategy pattern, you can switch algorithms at runtime without modifying
        the code that uses them. This promotes flexibility, modularity, and
        maintainability in your application.
      </p>

      <p>
        For example, one day you might take the bus to work, another day you
        might take the train. Whatever transportation mode you pick, that's a
        strategy.
      </p>

      <H2 title="Implementation example" />

      <Tabs defaultValue="old" className="w-full">
        <TabsList>
          <TabsTrigger value="old">Without Strategy</TabsTrigger>
          <TabsTrigger value="new">With Strategy</TabsTrigger>
        </TabsList>
        <TabsContent value="old">
          <CodeBlock code={OLD_CODE}>
            <HighlightedCode code={OLD_CODE} lang="python" />
          </CodeBlock>
          <p>
            With this implementation, anytime we want to add a new commute
            option, we need to add another elif condition. This will make the
            commute function harder to read and bloated very quickly.
          </p>
        </TabsContent>
        <TabsContent value="new">
          <CodeBlock code={NEW_CODE}>
            <HighlightedCode code={NEW_CODE} lang="python" />
          </CodeBlock>
          <p>
            With this pattern, we can add new commute options in their own
            classes and implement their functionality. Our commute function
            doesn't need to worry about how many commute options there are, how
            they're implemented, etc. This keeps the code much cleaner and
            maintainable.
          </p>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}

const OLD_CODE = `class Commuter:
  def __init__(self):
    pass

  def commute(t: str):
    if (t == "bus"):
      # do bus stuff
      pass
    elif (t == "car"):
      # do car stuff
      pass
    elif (t == "train"):
      # do train stuff
      pass`;

const NEW_CODE = `class TransportStrategy:
  def __init__(self):
    pass
    
  def transport(self):
    pass
    
class BusStrategy(TransportStrategy):
  def __init__(self):
    pass
  def transport(self):
    print("Taking bus")
        
class TrainStrategy(TransportStrategy):
  def __init__(self):
    pass
  
  def transport(self):
    print("Taking train")
        
class CarStrategy(TransportStrategy):
  def __init__(self):
    pass
    
  def transport(self):
    print("Taking car")
        

class Commuter2:
  def __init__(self):
    # use car by default
    self.strategy = CarStrategy()
        
  def setStrategy(self, strategy: TransportStrategy):
    self.strategy = strategy
        
  def commute(self):
    self.strategy.transport()
        

c = Commuter2()
c.commute() # prints taking car
c.setStrategy(TrainStrategy())
c.commute() # prints taking train`;
