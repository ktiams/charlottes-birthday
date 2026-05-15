import { useEffect, useMemo, useState } from "react";
import { Home, LogOut, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardStats from "./admin/DashboardStats";
import ExportCSVButton from "./admin/ExportCSVButton";
import RSVPCardList from "./admin/RSVPCardList";
import RSVPFilters from "./admin/RSVPFilters";
import RSVPTable from "./admin/RSVPTable";
import type { RSVPFilter } from "./admin/types";
import { addSampleRsvps, clearRsvps, deleteRsvp, fetchRsvps, type RSVP } from "../lib/rsvp";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const navigate = useNavigate();
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [filter, setFilter] = useState<RSVPFilter>("all");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void loadRsvps();
  }, []);

  const loadRsvps = async () => {
    setIsLoading(true);
    setError("");

    try {
      setRsvps(await fetchRsvps());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load RSVP data.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRsvps = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return rsvps.filter((rsvp) => {
      const matchesFilter = filter === "all" || rsvp.attendance === filter;
      const matchesQuery =
        !normalized ||
        [rsvp.name, rsvp.phone, rsvp.email].some((value) => value.toLowerCase().includes(normalized));

      return matchesFilter && matchesQuery;
    });
  }, [filter, query, rsvps]);

  const handleDelete = async (id: string) => {
    setIsMutating(true);
    setError("");

    try {
      await deleteRsvp(id);
      await loadRsvps();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete this RSVP.");
    } finally {
      setIsMutating(false);
    }
  };

  const handleClear = async () => {
    if (!window.confirm("Clear all RSVP records from Supabase?")) return;

    setIsMutating(true);
    setError("");

    try {
      await clearRsvps();
      await loadRsvps();
    } catch (clearError) {
      setError(clearError instanceof Error ? clearError.message : "Unable to clear RSVP data.");
    } finally {
      setIsMutating(false);
    }
  };

  const handleAddSamples = async () => {
    setIsMutating(true);
    setError("");

    try {
      await addSampleRsvps();
      await loadRsvps();
    } catch (sampleError) {
      setError(sampleError instanceof Error ? sampleError.message : "Unable to add sample RSVPs.");
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream text-cocoa">
      <section className="mx-auto w-full max-w-7xl px-5 py-8 sm:py-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Private admin</p>
            <h1 className="font-display text-5xl leading-none sm:text-7xl">RSVP Dashboard</h1>
            <p className="mt-4 max-w-2xl leading-7 text-cocoa/70">
              Live Supabase dashboard for reviewing Charlotte Ysabella's RSVP responses before admin auth is added.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => navigate("/")}>
              <Home className="h-4 w-4" /> Back to Invitation
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        <DashboardStats rsvps={rsvps} />

        <Card className="mt-8 bg-white/55">
          {error && (
            <div className="mb-5 rounded-2xl bg-blush/45 px-4 py-3 text-sm font-medium text-[#9f3f4d]">
              {error}
            </div>
          )}
          <div className="mb-5">
            <RSVPFilters filter={filter} query={query} onFilterChange={setFilter} onQueryChange={setQuery} />
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <ExportCSVButton rsvps={filteredRsvps} />
            <Button size="sm" variant="secondary" onClick={handleAddSamples} disabled={isMutating}>
              <Plus className="h-4 w-4" /> Add Sample RSVP
            </Button>
            <Button size="sm" variant="outline" onClick={handleClear} disabled={isMutating}>
              <Trash2 className="h-4 w-4" /> Clear Test Data
            </Button>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              <RSVPTable rsvps={filteredRsvps} onDelete={handleDelete} isMutating={isMutating} />
              <RSVPCardList rsvps={filteredRsvps} onDelete={handleDelete} isMutating={isMutating} />
            </>
          )}
        </Card>
      </section>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-4">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-20 animate-pulse rounded-3xl bg-white/60" />
      ))}
    </div>
  );
}
