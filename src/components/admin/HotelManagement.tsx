import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Search, Plus, Edit, Trash2, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const HotelManagement = () => {
  const [hotels, setHotels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [editingHotel, setEditingHotel] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    location: "",
    description: "",
    star_rating: 5,
    base_price: 0,
    club_price: 0,
    amenities: [],
    images: [],
  });

  React.useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHotel) {
        const { error } = await supabase
          .from("hotels")
          .update(formData)
          .eq("id", editingHotel.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("hotels").insert([formData]);
        if (error) throw error;
      }
      fetchHotels();
      setEditingHotel(null);
      setFormData({
        name: "",
        location: "",
        description: "",
        star_rating: 5,
        base_price: 0,
        club_price: 0,
        amenities: [],
        images: [],
      });
    } catch (error) {
      console.error("Error saving hotel:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;
    try {
      const { error } = await supabase.from("hotels").delete().eq("id", id);
      if (error) throw error;
      fetchHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Hotels Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingHotel ? "Edit Hotel" : "Add New Hotel"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Hotel Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="star_rating">Star Rating</Label>
                  <Input
                    id="star_rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.star_rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        star_rating: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base_price">Base Price</Label>
                  <Input
                    id="base_price"
                    type="number"
                    value={formData.base_price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        base_price: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="club_price">Club Price</Label>
                  <Input
                    id="club_price"
                    type="number"
                    value={formData.club_price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        club_price: parseFloat(e.target.value),
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Images (comma-separated URLs)</Label>
                <Input
                  id="images"
                  value={formData.images.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      images: e.target.value
                        .split(",")
                        .map((url) => url.trim()),
                    })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input
                  id="amenities"
                  value={formData.amenities.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      amenities: e.target.value
                        .split(",")
                        .map((amenity) => amenity.trim()),
                    })
                  }
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="submit">
                  {editingHotel ? "Update Hotel" : "Add Hotel"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Club Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading hotels...
                  </TableCell>
                </TableRow>
              ) : filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>{hotel.name}</TableCell>
                    <TableCell>{hotel.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1">{hotel.star_rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>${hotel.base_price}</TableCell>
                    <TableCell>${hotel.club_price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingHotel(hotel);
                                setFormData(hotel);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Hotel</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Hotel Name</Label>
                                  <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        name: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="location">Location</Label>
                                  <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        location: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={formData.description}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      description: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>

                              <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="star_rating">
                                    Star Rating
                                  </Label>
                                  <Input
                                    id="star_rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={formData.star_rating}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        star_rating: parseInt(e.target.value),
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="base_price">Base Price</Label>
                                  <Input
                                    id="base_price"
                                    type="number"
                                    value={formData.base_price}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        base_price: parseFloat(e.target.value),
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="club_price">Club Price</Label>
                                  <Input
                                    id="club_price"
                                    type="number"
                                    value={formData.club_price}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        club_price: parseFloat(e.target.value),
                                      })
                                    }
                                    required
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="images">
                                  Images (comma-separated URLs)
                                </Label>
                                <Input
                                  id="images"
                                  value={formData.images.join(", ")}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      images: e.target.value
                                        .split(",")
                                        .map((url) => url.trim()),
                                    })
                                  }
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="amenities">
                                  Amenities (comma-separated)
                                </Label>
                                <Input
                                  id="amenities"
                                  value={formData.amenities.join(", ")}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      amenities: e.target.value
                                        .split(",")
                                        .map((amenity) => amenity.trim()),
                                    })
                                  }
                                  required
                                />
                              </div>

                              <div className="flex justify-end gap-2">
                                <Button type="submit">Update Hotel</Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(hotel.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No hotels found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
