import React, { useState } from "react"
import styled from "styled-components"
import { Calendar, Target, BarChart3, Plus, Edit, Trash2 } from 'lucide-react'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`

const Dashboard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const Header = styled.div`
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 2rem;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
`

const TabContainer = styled.div`
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`

const Tab = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: ${(props) => (props.active ? "white" : "transparent")};
  border: none;
  border-bottom: 3px solid ${(props) => (props.active ? "#4f46e5" : "transparent")};
  color: ${(props) => (props.active ? "#4f46e5" : "#64748b")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${(props) => (props.active ? "white" : "#f1f5f9")};
  }
`

const Content = styled.div`
  padding: 2rem;
`

const Card = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          background: #4f46e5;
          color: white;
          &:hover { background: #4338ca; }
        `
      case "danger":
        return `
          background: #ef4444;
          color: white;
          &:hover { background: #dc2626; }
        `
      default:
        return `
          background: #f1f5f9;
          color: #475569;
          &:hover { background: #e2e8f0; }
        `
    }
  }}
`

const Form = styled.form`
  display: grid;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 500;
  color: #374151;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #374151;
`

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #4b5563;
`

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

const RatingButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.active ? "#4f46e5" : "#d1d5db")};
  background: ${(props) => (props.active ? "#4f46e5" : "white")};
  color: ${(props) => (props.active ? "white" : "#6b7280")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4f46e5;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6b7280;
`

export default function PerformanceManagement() {
  const [activeTab, setActiveTab] = useState("goals")
  const [goals, setGoals] = useState([])
  const [checkIns, setCheckIns] = useState([])
  const [performanceData, setPerformanceData] = useState([
    { category: "Goal Achievement", selfRating: 0, managerRating: 0, comments: "" },
    { category: "Collaboration & Teamwork", selfRating: 0, managerRating: 0, comments: "" },
    { category: "Problem Solving", selfRating: 0, managerRating: 0, comments: "" },
    { category: "Initiative & Ownership", selfRating: 0, managerRating: 0, comments: "" },
    { category: "Communication", selfRating: 0, managerRating: 0, comments: "" },
  ])

  const [showGoalForm, setShowGoalForm] = useState(false)
  const [showCheckInForm, setShowCheckInForm] = useState(false)

  const handleAddGoal = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newGoal = {
      id: Date.now(),
      objective: formData.get("objective"),
      keyResults: formData.get("keyResults"),
      owner: formData.get("owner"),
      dueDate: formData.get("dueDate"),
    }
    setGoals([...goals, newGoal])
    setShowGoalForm(false)
    e.currentTarget.reset()
  }

  const handleAddCheckIn = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newCheckIn = {
      id: Date.now(),
      date: formData.get("date"),
      progress: formData.get("progress"),
      challenges: formData.get("challenges"),
      support: formData.get("support"),
      nextSteps: formData.get("nextSteps"),
    }
    setCheckIns([...checkIns, newCheckIn])
    setShowCheckInForm(false)
    e.currentTarget.reset()
  }

  const updatePerformanceRating = (index, field, value) => {
    const updated = [...performanceData]
    updated[index][field] = value
    setPerformanceData(updated)
  }

  const updatePerformanceComments = (index, comments) => {
    const updated = [...performanceData]
    updated[index].comments = comments
    setPerformanceData(updated)
  }

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId))
  }

  const deleteCheckIn = (checkInId) => {
    setCheckIns(checkIns.filter(checkIn => checkIn.id !== checkInId))
  }

  return (
    <Container>
      <Dashboard>
        <Header>
          <Title>Performance Management System</Title>
          <Subtitle>Track goals, check-ins, and performance reviews</Subtitle>
        </Header>

        <TabContainer>
          <Tab active={activeTab === "goals"} onClick={() => setActiveTab("goals")}>
            <Target size={20} />
            Goal Setting
          </Tab>
          <Tab active={activeTab === "checkins"} onClick={() => setActiveTab("checkins")}>
            <Calendar size={20} />
            Check-Ins
          </Tab>
          <Tab active={activeTab === "performance"} onClick={() => setActiveTab("performance")}>
            <BarChart3 size={20} />
            Performance Review
          </Tab>
        </TabContainer>

        <Content>
          {activeTab === "goals" && (
            <div>
              <CardHeader>
                <CardTitle>Goals & Objectives</CardTitle>
                <Button variant="primary" onClick={() => setShowGoalForm(!showGoalForm)}>
                  <Plus size={16} />
                  Add Goal
                </Button>
              </CardHeader>

              {showGoalForm && (
                <Card>
                  <Form onSubmit={handleAddGoal}>
                    <FormGroup>
                      <Label>Objective (What)</Label>
                      <TextArea name="objective" required placeholder="Describe the objective..." />
                    </FormGroup>
                    <FormGroup>
                      <Label>Key Results (How)</Label>
                      <TextArea name="keyResults" required placeholder="Define measurable key results..." />
                    </FormGroup>
                    <FormGroup>
                      <Label>Owner</Label>
                      <Input name="owner" required placeholder="Goal owner" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Due Date</Label>
                      <Input name="dueDate" type="date" required />
                    </FormGroup>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <Button type="submit" variant="primary">
                        Save Goal
                      </Button>
                      <Button type="button" onClick={() => setShowGoalForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </Card>
              )}

              {goals.length === 0 ? (
                <EmptyState>
                  <Target size={48} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
                  <p>No goals set yet. Click "Add Goal" to get started.</p>
                </EmptyState>
              ) : (
                <Card>
                  <Table>
                    <thead>
                      <tr>
                        <Th>Objective (What)</Th>
                        <Th>Key Results (How)</Th>
                        <Th>Owner</Th>
                        <Th>Due Date</Th>
                        <Th>Actions</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {goals.map((goal) => (
                        <tr key={goal.id}>
                          <Td>{goal.objective}</Td>
                          <Td>{goal.keyResults}</Td>
                          <Td>{goal.owner}</Td>
                          <Td>{goal.dueDate}</Td>
                          <Td>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                              <Button>
                                <Edit size={14} />
                              </Button>
                              <Button variant="danger" onClick={() => deleteGoal(goal.id)}>
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </Td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              )}
            </div>
          )}

          {activeTab === "checkins" && (
            <div>
              <CardHeader>
                <CardTitle>Check-Ins</CardTitle>
                <Button variant="primary" onClick={() => setShowCheckInForm(!showCheckInForm)}>
                  <Plus size={16} />
                  Add Check-In
                </Button>
              </CardHeader>

              {showCheckInForm && (
                <Card>
                  <Form onSubmit={handleAddCheckIn}>
                    <FormGroup>
                      <Label>Check-In Date</Label>
                      <Input name="date" type="date" required />
                    </FormGroup>
                    <FormGroup>
                      <Label>Progress Since Last Check-In</Label>
                      <TextArea name="progress" required placeholder="Describe your progress..." />
                    </FormGroup>
                    <FormGroup>
                      <Label>Current Challenges</Label>
                      <TextArea name="challenges" placeholder="What challenges are you facing?" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Support Needed</Label>
                      <TextArea name="support" placeholder="What support do you need?" />
                    </FormGroup>
                    <FormGroup>
                      <Label>Next Steps Before Next Check-In</Label>
                      <TextArea name="nextSteps" required placeholder="What are your next steps?" />
                    </FormGroup>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <Button type="submit" variant="primary">
                        Save Check-In
                      </Button>
                      <Button type="button" onClick={() => setShowCheckInForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </Card>
              )}

              {checkIns.length === 0 ? (
                <EmptyState>
                  <Calendar size={48} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
                  <p>No check-ins recorded yet. Click "Add Check-In" to get started.</p>
                </EmptyState>
              ) : (
                <div>
                  {checkIns.map((checkIn) => (
                    <Card key={checkIn.id}>
                      <CardHeader>
                        <CardTitle>Check-In - {checkIn.date}</CardTitle>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Button>
                            <Edit size={14} />
                          </Button>
                          <Button variant="danger" onClick={() => deleteCheckIn(checkIn.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </CardHeader>
                      <div style={{ display: "grid", gap: "1rem" }}>
                        <div>
                          <strong>Progress:</strong>
                          <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280" }}>{checkIn.progress}</p>
                        </div>
                        <div>
                          <strong>Challenges:</strong>
                          <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280" }}>{checkIn.challenges}</p>
                        </div>
                        <div>
                          <strong>Support Needed:</strong>
                          <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280" }}>{checkIn.support}</p>
                        </div>
                        <div>
                          <strong>Next Steps:</strong>
                          <p style={{ margin: "0.5rem 0 0 0", color: "#6b7280" }}>{checkIn.nextSteps}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "performance" && (
            <div>
              <CardHeader>
                <CardTitle>Performance Review</CardTitle>
              </CardHeader>

              <Card>
                <Table>
                  <thead>
                    <tr>
                      <Th>Category</Th>
                      <Th>Self Rating (1–5)</Th>
                      <Th>Manager Rating (1–5)</Th>
                      <Th>Comments</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((item, index) => (
                      <tr key={index}>
                        <Td style={{ fontWeight: "500" }}>{item.category}</Td>
                        <Td>
                          <RatingContainer>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <RatingButton
                                key={rating}
                                active={item.selfRating === rating}
                                onClick={() => updatePerformanceRating(index, "selfRating", rating)}
                              >
                                {rating}
                              </RatingButton>
                            ))}
                          </RatingContainer>
                        </Td>
                        <Td>
                          <RatingContainer>
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <RatingButton
                                key={rating}
                                active={item.managerRating === rating}
                                onClick={() => updatePerformanceRating(index, "managerRating", rating)}
                              >
                                {rating}
                              </RatingButton>
                            ))}
                          </RatingContainer>
                        </Td>
                        <Td>
                          <Input
                            value={item.comments}
                            onChange={(e) => updatePerformanceComments(index, e.target.value)}
                            placeholder="Add comments..."
                          />
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>

              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <Button variant="primary">Save Performance Review</Button>
              </div>
            </div>
          )}
        </Content>
      </Dashboard>
    </Container>
  )
}